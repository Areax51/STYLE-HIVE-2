import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
    liked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
// Add this route below your existing routes in chat.js
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const chat = await Chat.findByIdAndUpdate(
      req.params.id,
      { liked: req.body.liked },
      { new: true }
    );
    res.json(chat);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update like status" });
  }
});

export default mongoose.model("Chat", chatSchema);
