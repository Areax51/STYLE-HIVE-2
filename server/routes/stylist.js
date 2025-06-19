import express from "express";
import multer from "multer";
import { OpenAI } from "openai";
import dotenv from "dotenv";
import authMiddleware from "../middleware/auth.js";

dotenv.config();
const router = express.Router();
const upload = multer();

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

router.post(
  "/image",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) return res.status(400).json({ msg: "Image required" });

    try {
      const base64Image = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "system",
            content:
              "You are a futuristic fashion stylist. Analyze uploaded outfit images and give confident, stylish feedback with optional suggestions.",
          },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: { url: base64Image },
              },
              {
                type: "text",
                text: "Give me fashion feedback and styling tips for this outfit. Recommend matching pieces if relevant.",
              },
            ],
          },
        ],
        max_tokens: 500,
      });

      const reply = completion.choices[0].message.content;
      res.json({ reply });
    } catch (err) {
      console.error("Vision error:", err.message);
      res.status(500).json({ msg: "AI styling failed" });
    }
  }
);

export default router;
