// server/routes/chat.js

import dotenv from "dotenv";
dotenv.config(); // ← load env first

console.log("🔑 OpenAI key loaded:", Boolean(process.env.OPENAI_API_KEY));

import express from "express";
import multer from "multer";
import { OpenAI } from "openai";
import authMiddleware from "../middleware/auth.js";
import Chat from "../models/chat.js";
import Product from "../models/Product.js";

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const upload = multer({ storage: multer.memoryStorage() });

// 🧠 Text Chat with AI + Auto Mood Tags
router.post("/", authMiddleware, async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ msg: "Message is required" });

  try {
    // Fetch some products to include in the system prompt
    const products = await Product.find().limit(50);
    const productList = products
      .map((p) => `${p.name} - $${p.price}`)
      .join("\n");

    const systemPrompt = `
You are StyleHive AI, a futuristic fashion stylist.
Recommend outfits, give confident fashion advice, and use these products if helpful:
${productList}
Be bold, expressive, and style-forward.
`;

    // 📝 Primary chat completion
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;

    // 🏷️ Mood Tagging
    const tagPrompt = `
Given this AI fashion response:
"${reply}"

Extract 1–3 lowercase tags that describe the fashion style or theme.
Examples: ["streetwear", "elegant", "casual", "vintage", "bold"]
Respond ONLY with a JSON array of strings.
`;

    const tagCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Extract mood/style tags as JSON array." },
        { role: "user", content: tagPrompt },
      ],
    });

    let tags = [];
    try {
      tags = JSON.parse(tagCompletion.choices[0].message.content);
    } catch {
      tags = [];
    }

    // Save chat
    const newChat = await Chat.create({
      userId: req.user.id,
      prompt: message,
      response: reply,
      tags,
    });

    res.json({ reply, tags, chatId: newChat._id });
  } catch (err) {
    // Enhanced error logging
    console.error("🛑 AI Chat Error (full):", err);
    if (err.response) {
      console.error("🛑 OpenAI response data:", err.response.data);
    }
    // Return the raw detail so client can see it
    res.status(500).json({
      msg: "AI service error",
      detail: err.response?.data || err.message,
    });
  }
});

// 🖼️ GPT-4 Vision Image Upload
router.post(
  "/image",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) return res.status(400).json({ msg: "Image is required" });

    try {
      const base64Image = req.file.buffer.toString("base64");

      const visionRes = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `You're StyleHive AI. 
Describe this outfit and suggest matching fashion items (top, bottom, shoes, accessories).
Include a brief summary of the style and ideal occasion.`,
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:${req.file.mimetype};base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 700,
      });

      const reply =
        visionRes.choices?.[0]?.message?.content || "AI did not respond.";
      res.json({ response: reply });
    } catch (err) {
      console.error("🛑 AI Vision Error (full):", err);
      if (err.response)
        console.error("🛑 Vision response data:", err.response.data);
      res.status(500).json({
        msg: "AI service error",
        detail: err.response?.data || err.message,
      });
    }
  }
);

// 📜 Get last 10 chats
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const history = await Chat.find({ userId: req.user.id })
      .sort({ timestamp: -1 })
      .limit(10);
    res.json(history);
  } catch (err) {
    console.error("❌ Fetching history failed:", err);
    res.status(500).json({ msg: "Failed to fetch chat history" });
  }
});

// ❤️ Like/Unlike a chat
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const chat = await Chat.findByIdAndUpdate(
      req.params.id,
      { liked: req.body.liked },
      { new: true }
    );
    if (!chat) return res.status(404).json({ msg: "Chat not found" });
    res.json(chat);
  } catch (err) {
    console.error("❌ Updating like status failed:", err);
    res.status(500).json({ msg: "Failed to update like status" });
  }
});

export default router;
