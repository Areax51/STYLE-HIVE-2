import express from "express";
import Favorite from "../models/Favorite.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET favorites for user
router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.params.userId });
    res.json(favorites.map((fav) => fav.product)); // return array of products
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add favorite
router.post("/:userId", authMiddleware, async (req, res) => {
  try {
    const newFav = new Favorite({
      userId: req.params.userId,
      product: req.body.product,
    });
    await newFav.save();
    res.status(201).json(newFav.product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE favorite
router.delete("/:userId/:productId", authMiddleware, async (req, res) => {
  try {
    await Favorite.findOneAndDelete({
      userId: req.params.userId,
      "product._id": req.params.productId,
    });
    res.json({ message: "Favorite removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
