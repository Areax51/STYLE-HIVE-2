import React from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

const ProductCard = ({ product }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isFavorited = favorites.some((fav) => fav._id === product._id);

  <Heart
    className={`cursor-pointer transition ${
      isFavorited ? "text-red-500 fill-red-500" : "text-gold"
    }`}
    onClick={() =>
      isFavorited ? removeFromFavorites(product._id) : addToFavorites(product)
    }
  />;
  return (
    <div className="bg-gray-800 p-4 rounded-xl border border-gold shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-3"
      />
      <h2 className="text-xl font-bold text-gold">{product.name}</h2>
      <p className="text-white text-sm">{product.description}</p>
      <div className="flex items-center justify-between mt-3">
        <p className="text-yellow-400 font-bold">${product.price}</p>
        <Heart
          className={`w-6 h-6 cursor-pointer transition ${
            isFavorited ? "text-red-500 fill-red-500" : "text-gold"
          }`}
          onClick={() =>
            isFavorited
              ? removeFromFavorites(product._id)
              : addToFavorites(product)
          }
        />
      </div>
    </div>
  );
};

export default ProductCard;
