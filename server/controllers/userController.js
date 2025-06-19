import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, isSeller } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ username, email, password, isSeller });
    const saved = await newUser.save();
    res.status(201).json({ message: "User registered", user: saved });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, username: user.username, isSeller: user.isSeller },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.json({
      token,
      user: { id: user._id, username: user.username, isSeller: user.isSeller },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
