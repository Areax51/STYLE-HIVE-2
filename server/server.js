// server/server.js
import http from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import { OpenAI } from "openai";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import chatRoutes from "./routes/chat.js";
import favoritesRoutes from "./routes/favorites.js";
import cartRoutes from "./routes/cart.js";
import userRoutes from "./routes/user.js"; // If you want /api/user
import stylistRoutes from "./routes/stylist.js"; // If you want /api/stylist
import recommendRoutes from "./routes/recommend.js"; // If you want /api/recommend

// Models
import Product from "./models/Product.js";
import Chat from "./models/chat.js";

dotenv.config();
await connectDB();

const app = express();

// ── CORS Setup ───────────────────────────────────────────────────────────────
const allowedOrigins = [
  "http://localhost:5173", // Vite dev
  "https://style-hive-2.vercel.app",
  "https://style-hive-2-production.up.railway.app",
];

app.use(
  cors({
    origin: (origin, cb) =>
      !origin || allowedOrigins.includes(origin)
        ? cb(null, true)
        : cb(new Error("Not allowed by CORS")),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// THE IMPORTANT PART — use "*", not regex
app.options("*", cors());

// ── Bodyparser ────────────────────────────────────────────────────────────────
app.use(express.json());

// ── API Routes ───────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/user", userRoutes);
app.use("/api/stylist", stylistRoutes);
app.use("/api/recommend", recommendRoutes);
// ── Serve Client in Production ───────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../client/dist/index.html"))
  );
}

// ── 404 & Error Handlers ─────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ msg: "Not Found" }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Server Error" });
});

// ── HTTP + Socket.IO Server ─────────────────────────────────────────────────
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: allowedOrigins, credentials: true, methods: ["GET", "POST"] },
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  socket.on("userMessage", async ({ message, token }) => {
    if (!message || !token)
      return socket.emit("aiReplyError", "Message and token are required.");

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

// ── Start Server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
