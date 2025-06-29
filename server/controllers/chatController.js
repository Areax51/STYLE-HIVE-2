import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiver, content } = req.body;
    const msg = new Message({
      sender: req.user.id,
      receiver,
      content,
    });
    const saved = await msg.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getConversation = async (req, res) => {
  try {
    const userId = req.user.id;
    const otherId = req.params.userId;
    const msgs = await Message.find({
      $or: [
        { sender: userId, receiver: otherId },
        { sender: otherId, receiver: 
      ],
    }).sort("createdAt");
    res.json(msgs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
