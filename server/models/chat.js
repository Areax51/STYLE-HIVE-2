import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  liked: { type: Boolean, default: false },
  tags: [{ type: String }], // ✅ new field for style/mood tags
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Chat", ChatSchema);
