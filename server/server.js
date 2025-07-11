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

// Routes
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import chatRoutes from "./routes/chat.js";
import favoritesRoutes from "./routes/favorites.js";
import cartRoutes from "./routes/cart.js";

// Models
import Product from "./models/Product.js";
import Chat from "./models/chat.js";

dotenv.config();
await connectDB();

const app = express();
console.log("🔥 Starting **this** server.js");

// ── 1) CORS ───────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  "https://style-hive-2.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// ── 2) Logger ─────────────────────────────────────────────
app.use((req, res, next) => {
  console.log(
    "⬅️  Origin:",
    req.headers.origin,
    "| Path:",
    req.method,
    req.path
  );
  next();
});

// ── 3) Middleware ─────────────────────────────────────────
app.use(express.json());

// ── 4) Routes ─────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/cart", cartRoutes);

// ── 5) Serve Client in Production ─────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

// ── 6) Error Handling ─────────────────────────────────────
app.use((req, res) => res.status(404).json({ msg: "Not Found" }));

app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack || err);
  res.status(500).json({ msg: err.message || "Internal Server Error" });
});

// ── 7) Socket.IO Server ───────────────────────────────────
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGINS,
    credentials: true,
    methods: ["GET", "POST"],
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

      await new Chat({ userId, prompt: message, response: full }).save();
      socket.emit("aiReplyComplete", full);
    } catch (err) {
      console.error("🛑 AI error:", err);
      socket.emit("aiReplyError", "AI error occurred");
    }
  });
});

// ── 8) Launch ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Listening on http://localhost:${PORT}`);
});
