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
    const products = favorites.map((fav) => fav.product);
    res.json(products);
  } catch (err) {
    console.error("❌ Fetching favorites failed:", err.message);
    res.status(500).json({ msg: "Error fetching favorites" });
  }
});

// ✅ Add a product to favorites
router.post("/", authMiddleware, async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ msg: "Product ID is required" });
  }

  try {
    const exists = await Favorite.findOne({
      user: req.user.id,
      product: productId,
    });
    if (exists) return res.status(409).json({ msg: "Already in favorites" });

    const favorite = new Favorite({ user: req.user.id, product: productId });
    await favorite.save();

    const fullProduct = await Product.findById(productId);
    res.status(201).json(fullProduct);
  } catch (err) {
    console.error("❌ Adding favorite failed:", err.message);
    res.status(500).json({ msg: "Failed to add to favorites" });
  }
});

// ✅ Remove a favorite
router.delete("/:productId", authMiddleware, async (req, res) => {
  try {
    await Favorite.findOneAndDelete({
      user: req.user.id,
      product: req.params.productId,
    });
    res.json({ msg: "Removed from favorites" });
  } catch (err) {
    console.error("❌ Deleting favorite failed:", err.message);
    res.status(500).json({ msg: "Failed to remove favorite" });
  }
});

export default router;
