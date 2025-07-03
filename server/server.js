// index.js
import http from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { OpenAI } from "openai";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import chatRoutes from "./routes/chat.js";
import favoritesRoutes from "./routes/favorites.js";

// Models
import Product from "./models/Product.js";
import Chat from "./models/chat.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Allowed origins for Vercel and Localhost
const allowedOrigins = [
  "https://style-hive-2.vercel.app",
  "http://localhost:5173",
];

// ✅ CORS Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors()); // ✅ Preflight support

// ✅ Middleware
app.use(express.json());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/favorites", favoritesRoutes);

// ✅ Create HTTP Server
const server = http.createServer(app);

// ✅ Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

// ✅ OpenAI Setup
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ✅ Socket.io Handlers
io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  socket.on("userMessage", async ({ message, token }) => {
    if (!message || !token) {
      return socket.emit("aiReplyError", "Message and token are required.");
    }

    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
    } catch (err) {
      return socket.emit("aiReplyError", "Invalid or expired token.");
    }

    try {
      const products = await Product.find().limit(30);
      const productList = products
        .map((p) => `${p.name} - $${p.price}`)
        .join("\n");

      const aiInstructions = `
You are StyleHive AI, a stylish, futuristic assistant.
- Recommend outfits and style advice.
- Use these products when relevant:
${productList}
- Be confident, brief, and inspiring.
`;

      const stream = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: aiInstructions },
          { role: "user", content: message },
        ],
        stream: true,
      });

      let fullReply = "";

      for await (const chunk of stream) {
        const text = chunk.choices?.[0]?.delta?.content || "";
        fullReply += text;
        socket.emit("aiReplyChunk", text);
      }

      await new Chat({
        userId,
        prompt: message,
        response: fullReply,
      }).save();

      socket.emit("aiReplyComplete", fullReply);
    } catch (err) {
      console.error("🛑 AI error:", err.message);
      socket.emit("aiReplyError", "AI error occurred");
    }
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server live at http://localhost:${PORT}`)
);
