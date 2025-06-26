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
const upload = multer({ storage: multer.memoryStorage() }); // 🔄 for image upload

// 🧠 Text Chat Route
router.post("/", authMiddleware, async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ msg: "Message is required" });

  try {
    const products = await Product.find().limit(50);
    const productList = products
      .map((p) => `${p.name} - $${p.price}`)
      .join("\n");

    const aiInstructions = `
You are StyleHive AI, a futuristic fashion stylist assistant.
- Recommend outfit ideas.
- Suggest products from this list when relevant:
${productList}
- Respond with confidence and flair.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: aiInstructions },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;

    const newChat = new Chat({
      userId: req.user.id,
      prompt: message,
      response: reply,
      timestamp: new Date(),
    });
    await newChat.save();

    res.json({ reply });
  } catch (err) {
    console.error("AI Chat error:", err.message);
    res.status(500).json({ msg: "AI service error" });
  }
});

// 📜 Chat History
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

// ❤️ Like / Unlike a Chat
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
    console.error("Like update error:", err.message);
    res.status(500).json({ msg: "Failed to update like status" });
  }
});

// 🖼 Image Styling Route (GPT-4 Vision)
router.post(
  "/image",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) return res.status(400).json({ msg: "Image is required" });

    try {
      const imageBuffer = req.file.buffer;
      const base64Image = imageBuffer.toString("base64");

      const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Describe this fashion look. Suggest the style, occasion, and related clothing items or accessories.",
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

      const aiReply =
        response.choices?.[0]?.message?.content || "No response from AI.";
      res.json({ response: aiReply });
    } catch (err) {
  console.error("❌ AI Chat error:", err.response?.data || err.message);
  res.status(500).json({ msg: "AI service error" });
}

  }
);

export default router;
