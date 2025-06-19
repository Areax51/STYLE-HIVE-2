import http from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authMiddleware from "./middleware/auth.js";
import { OpenAI } from "openai";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("userMessage", async ({ message, token }) => {
    try {
      const stream = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are StyleHive AI, a fashionable, friendly assistant. Help users with outfit advice and product suggestions.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        stream: true,
      });

      let fullReply = "";

      for await (const chunk of stream) {
        const text = chunk.choices?.[0]?.delta?.content || "";
        fullReply += text;
        socket.emit("aiReplyChunk", text);
      }

      socket.emit("aiReplyComplete", fullReply);
    } catch (err) {
      console.error("Streaming error:", err.message);
      socket.emit("aiReplyError", "Something went wrong");
    }
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
