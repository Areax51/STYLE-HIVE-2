import express from "express";
import multer from "multer";
import { OpenAI } from "openai";
import dotenv from "dotenv";
import authMiddleware from "../middleware/auth.js";
import Chat from "../models/chat.js";
import Product from "../models/Product.js";

dotenv.config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const upload = multer({ storage: multer.memoryStorage() });

// 🧠 Text Chat with AI
router.post("/", authMiddleware, async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ msg: "Message is required" });

  try {
    const products = await Product.find().limit(50);
    const productList = products
      .map((p) => `${p.name} - $${p.price}`)
      .join("\n");

    const systemPrompt = `
You are StyleHive AI, a futuristic fashion stylist.
Recommend styles, give fashion advice, and suggest products from this list if relevant:
${productList}
Keep it stylish and confident.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;

    await Chat.create({
      userId: req.user.id,
      prompt: message,
      response: reply,
      timestamp: new Date(),
    });

    res.json({ reply });
  } catch (err) {
    console.error("AI Chat Error:", err.message);
    res.status(500).json({ msg: "AI service error" });
  }
});

// 📜 Chat History (Latest 10)
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const history = await Chat.find({ userId: req.user.id })
      .sort({ timestamp: -1 })
      .limit(10);
    res.json(history);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch chat history" });
  }
});

// 👍 Like / Unlike a Chat
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
    res.status(500).json({ msg: "Failed to update like status" });
  }
});

// 🖼️ Image Styling with GPT-4 Vision
router.post(
  "/image",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) return res.status(400).json({ msg: "Image is required" });

    try {
      const base64Image = req.file.buffer.toString("base64");

      const visionRes = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Describe this fashion look. Suggest the style, occasion, and matching outfit or accessory recommendations.",
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
        max_tokens: 600,
      });

      const reply =
        visionRes.choices?.[0]?.message?.content || "AI did not respond.";
      res.json({ response: reply });
    } catch (err) {
      console.error("AI Vision Error:", err.response?.data || err.message);
      res.status(500).json({ msg: "AI service error" });
    }
  }
);

export default router;
