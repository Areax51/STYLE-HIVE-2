import express from "express";
import authMiddleware from "../middleware/auth.js";
import Favorite from "../models/Favorite.js";
import Product from "../models/Product.js";

const router = express.Router();

// 🟢 Get all favorites for a user
router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const favorites = await Favorite.find({
      userId: req.params.userId,
    }).populate("productId");

    // Return full product objects
    const products = favorites.map((f) => f.productId);
    res.json(products);
  } catch (err) {
    console.error("❌ Get favorites error:", err.message);
    res.status(500).json({ msg: "Failed to fetch favorites" });
  }
});

// 🟢 Add a favorite
router.post("/:userId", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId)
      return res.status(400).json({ msg: "productId is required" });

    const exists = await Favorite.findOne({
      userId: req.params.userId,
      productId,
    });
    if (exists) return res.status(400).json({ msg: "Already in favorites" });

    const favorite = new Favorite({
      userId: req.params.userId,
      productId,
    });
    await favorite.save();

    const fullProduct = await Product.findById(productId);
    res.status(201).json(fullProduct); // Return full product, not the Favorite doc
  } catch (err) {
    console.error("❌ Add favorite error:", err.message);
    res.status(500).json({ msg: "Failed to add favorite" });
  }
});

// 🟢 Remove a favorite
router.delete("/:userId/:productId", authMiddleware, async (req, res) => {
  try {
    await Favorite.findOneAndDelete({
      userId: req.params.userId,
      productId: req.params.productId,
    });
    res.json({ msg: "Favorite removed" });
  } catch (err) {
    console.error("❌ Delete favorite error:", err.message);
    res.status(500).json({ msg: "Failed to delete favorite" });
  }
});

export default router;
