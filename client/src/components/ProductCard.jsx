import React from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

const ProductCard = ({ product }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isFavorited = favorites?.some((f) => f._id === product._id);

  const handleFavorite = () => {
    if (isFavorited) {
      removeFromFavorites(product._id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-2xl border border-gold shadow-lg hover:shadow-xl transition">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover rounded-lg mb-3"
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/300x300?text=Image+Unavailable")
          }
        />
        <Heart
          onClick={handleFavorite}
          className={`absolute top-2 right-2 w-6 h-6 cursor-pointer transition ${
            isFavorited ? "text-red-500 fill-red-500" : "text-gold"
          }`}
        />
      </div>

      <h2 className="text-xl font-semibold text-gold mb-1">{product.name}</h2>
      <p className="text-white text-sm mb-2">{product.description}</p>

      <div className="flex justify-between items-center mb-2">
        <p className="text-yellow-400 font-bold">${product.price}</p>
      </div>

      <button
        onClick={handleFavorite}
        className={`w-full text-sm px-4 py-2 rounded-lg font-semibold transition ${
          isFavorited
            ? "bg-red-600 text-white hover:bg-red-500"
            : "bg-gold text-black hover:bg-yellow-400"
        }`}
      >
        {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default ProductCard;
