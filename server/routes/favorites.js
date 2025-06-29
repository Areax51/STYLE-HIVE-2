import express from "express";
import authMiddleware from "../middleware/auth.js";
import Favorite from "../models/Favorite.js";
import Product from "../models/Product.js";

const router = express.Router();

// ✅ Get favorites for current user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id }).populate(
      "product"
    );
    const products = favorites.map((f) => f.product);
    res.json(products);
  } catch (err) {
    console.error("❌ Get favorites error:", err.message);
    res.status(500).json({ msg: "Failed to fetch favorites" });
  }
});

// ✅ Add a product to favorites
router.post("/", authMiddleware, async (req, res) => {
  const { productId } = req.body;

  try {
    if (!productId)
      return res.status(400).json({ msg: "productId is required" });

    const exists = await Favorite.findOne({
      user: req.user.id,
      product: productId,
    });
    if (exists) return res.status(400).json({ msg: "Already in favorites" });

    const favorite = new Favorite({
      user: req.user.id,
      product: productId,
    });

    await favorite.save();
    const fullProduct = await Product.findById(productId);
    res.status(201).json(fullProduct);
  } catch (err) {
    console.error("❌ Add favorite error:", err.message);
    res.status(500).json({ msg: "Failed to add favorite" });
  }
});

// ✅ Delete a product from favorites
router.delete("/:productId", authMiddleware, async (req, res) => {
  try {
    await Favorite.findOneAndDelete({
      user: req.user.id,
      product: req.params.productId,
    });
    res.json({ msg: "Favorite removed" });
  } catch (err) {
    console.error("❌ Delete favorite error:", err.message);
    res.status(500).json({ msg: "Failed to delete favorite" });
  }
});

export default router;
