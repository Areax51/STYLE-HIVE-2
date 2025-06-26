// backend/models/Favorite.js
import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

export default mongoose.model("Favorite", FavoriteSchema);
