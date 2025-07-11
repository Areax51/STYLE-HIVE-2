// server/server.js
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

// Route modules
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import chatRoutes from "./routes/chat.js";
import favoritesRoutes from "./routes/favorites.js";
import cartRoutes from "./routes/cart.js";
// (optional imports commented out)
// import userRoutes      from "./routes/users.js";
// import stylistRoutes   from "./routes/stylist.js";
// import recommendRoutes from "./routes/recommend.js";

// Models for Socket.IO
import Product from "./models/Product.js";
import Chat from "./models/chat.js";

dotenv.config();
await connectDB();

const app = express();

// ── CORS SETUP ────────────────────────────────────────────────────────────────
// Whitelist your front-end on Vercel (and localhost for dev)
const ALLOWED = ["https://style-hive-2.vercel.app", "http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (mobile apps, curl, etc)
      if (!origin) return callback(null, true);
      if (ALLOWED.includes(origin)) return callback(null, true);
      callback(new Error("CORS policy: Not allowed by origin"));
    },
    credentials: true, // allow set-cookie
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// ── BODY PARSER ────────────────────────────────────────────────────────────────
app.use(express.json());

// ── API ROUTES ────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/cart", cartRoutes);
// app.use("/api/users",     userRoutes);
// app.use("/api/stylist",   stylistRoutes);
// app.use("/api/recommend", recommendRoutes);

// ── SERVE REACT IN PRODUCTION ──────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.use((req, res) =>
    res.sendFile(path.join(__dirname, "../client/dist/index.html"))
  );
}

// ── 404 & ERROR HANDLERS ──────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ msg: "Not Found" }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Server Error" });
});

// ── HTTP + SOCKET.IO SERVER ───────────────────────────────────────────────────
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ALLOWED,
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  },
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

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
- Recommend outfits and style advice.
- Use these products when relevant:
${list}
- Be confident, brief, and inspiring.
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

      await new Chat({ userId, prompt: message, response: full }).save();
      socket.emit("aiReplyComplete", full);
    } catch (err) {
      console.error("🛑 AI error:", err);
      socket.emit("aiReplyError", "AI error occurred");
    }
  });
});

// ── START SERVER ───────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
