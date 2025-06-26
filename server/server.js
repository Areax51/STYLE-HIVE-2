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
import Chat from "./models/chat.js"; // to save chat history

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/favorites", favoritesRoutes);

// Create HTTP server
const server = http.createServer(app);

// WebSocket setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// OpenAI setup
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

// WebSocket connection
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

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
You are StyleHive AI, a stylish, helpful assistant.
- Suggest fashion tips, outfit ideas, and style matches.
- Use these products when relevant:\n${productList}
- Be friendly, concise, and confident.
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

      // Save full chat to DB
      const newChat = new Chat({
        userId,
        prompt: message,
        response: fullReply,
      });
      await newChat.save();

      socket.emit("aiReplyComplete", fullReply);
    } catch (err) {
      console.error("Streaming error:", err.message);
      socket.emit("aiReplyError", "AI error occurred");
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
