import http from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";
import { OpenAI } from "openai";

// route handlers
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import chatRoutes from "./routes/chat.js";
import favoritesRoutes from "./routes/favorites.js";
import cartRoutes from "./routes/cart.js";

// models (for your socket logic)
import Product from "./models/Product.js";
import Chat from "./models/chat.js";

dotenv.config();
await connectDB();

const app = express();
console.log("🔥 Starting server.js");

// 1) GLOBAL CORS — allow your two front-ends
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://style-hive-2.vercel.app",
];

app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// 2) GLOBAL PRE-FLIGHT (regex catches everything)
app.options(/.*/, cors());

// 3) BODY PARSER
app.use(express.json());

// 4) MOUNT API ROUTES (with debug wrapping)
[
  ["/api/auth", authRoutes],
  ["/api/products", productRoutes],
  ["/api/chat", chatRoutes],
  ["/api/favorites", favoritesRoutes],
  ["/api/cart", cartRoutes],
].forEach(([routePath, router]) => {
  try {
    console.log(`→ Mounting ${routePath}`);
    app.use(routePath, router);
  } catch (err) {
    console.error(`‼️ Failed to mount ${routePath}:`, err);
  }
});

// 5) SERVE VITE APP IN PRODUCTION + SPA catch-all using regex
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  // catch-all for client-side routing
  app.get(/.*/, (req, res) =>
    res.sendFile(path.join(__dirname, "../client/dist/index.html"))
  );
}

// 6) 404 & ERROR HANDLING (after CORS)
app.use((req, res) => res.status(404).json({ msg: "Not Found" }));
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res
    .status(err.status || 500)
    .json({ msg: err.message || "Internal Server Error" });
});

// 7) START HTTP + SOCKET.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGINS,
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  },
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

io.on("connection", (socket) => {
  console.log("✅ Socket connected:", socket.id);

  socket.on("userMessage", async ({ message, token }) => {
    if (!message || !token) {
      return socket.emit("aiReplyError", "Message and token are required.");
    }

    let userId;
    try {
      userId = jwt.verify(token, process.env.JWT_SECRET).id;
    } catch {
      return socket.emit("aiReplyError", "Invalid or expired token.");
    }

    try {
      const products = await Product.find().limit(30);
      const list = products.map((p) => `${p.name} - $${p.price}`).join("\n");
      const prompt = `
You are StyleHive AI, a stylish, futuristic assistant.
Use these products when relevant:
${list}
Be confident, brief, and inspiring.
`;

      const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: message },
        ],
        stream: true,
      });

      let full = "";
      for await (const chunk of stream) {
        const text = chunk.choices?.[0]?.delta?.content || "";
        full += text;
        socket.emit("aiReplyChunk", text);
      }

      await Chat.create({ userId, prompt: message, response: full });
      socket.emit("aiReplyComplete", full);
    } catch (err) {
      console.error("🛑 AI Stream Error:", err);
      socket.emit("aiReplyError", "AI error occurred");
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Listening on http://localhost:${PORT}`)
);
