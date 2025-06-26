import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  product: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    price: Number,
    category: String,
    image: String,
  },
});

export default mongoose.model("Favorite", favoriteSchema);
