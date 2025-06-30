// src/components/ProductCard.jsx
import React, { useContext } from "react";
import axios from "../utils/axios"; // Use your axios wrapper
import { AuthContext } from "../contexts/AuthContext";

const ProductCard = ({ product }) => {
  const { token } = useContext(AuthContext);

  const handleAddToFavorites = async () => {
    try {
      const res = await axios.post(
        "/api/favorites",
        { productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Added to favorites!");
    } catch (err) {
      if (err.response?.data?.msg === "Already in favorites") {
        alert("⚠️ Already in favorites.");
      } else {
        console.error("❌ Add to favorites failed:", err);
        alert("Failed to add to favorites.");
      }
    }
  };

  return (
    <div className="bg-white text-black rounded-xl shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="h-64 w-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/fallback.jpg"; // Fallback image in public folder
        }}
      />
      <div className="p-3">
        <h2 className="font-bold text-lg">{product.name}</h2>
        <p className="text-sm text-gray-600">{product.description}</p>
        <p className="font-semibold mt-1">${product.price}</p>
        <button
          onClick={handleAddToFavorites}
          className="mt-2 px-3 py-1 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
