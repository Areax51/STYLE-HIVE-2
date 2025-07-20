// src/components/ProductCard.jsx
import React from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

// Utility to conditionally join Tailwind classes
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductCard = ({ product }) => {
  const { favorites, addToFavorites, removeFromFavorites, isFavorited } =
    useFavorites();
  const favorited = isFavorited(product._id);

  const handleFavorite = () => {
    if (favorited) removeFromFavorites(product._id);
    else addToFavorites(product);
  };

  return (
    <article
      aria-label={product.name}
      className="bg-white/10 border border-gold rounded-2xl shadow-lg hover:shadow-xl transition p-4 flex flex-col"
    >
      <div className="relative mb-4">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/placeholder-300.png";
          }}
          className="w-full h-56 object-cover rounded-lg"
        />
        <button
          onClick={handleFavorite}
          aria-pressed={favorited}
          aria-label={
            favorited
              ? `Remove ${product.name} from favorites`
              : `Add ${product.name} to favorites`
          }
          className={classNames(
            "absolute top-3 right-3 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-gold",
            favorited
              ? "bg-red-600 text-white hover:bg-red-500"
              : "bg-black/50 text-gold hover:bg-black/70"
          )}
        >
          <Heart size={24} className={favorited ? "fill-current" : ""} />
        </button>
      </div>

      <h2 className="text-lg font-semibold text-gold mb-2">{product.name}</h2>
      <p className="text-sm text-gray-300 flex-1 mb-4">{product.description}</p>

      <div className="flex items-center justify-between mb-4">
        <span className="text-xl font-bold text-yellow-400">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(product.price)}
        </span>
      </div>

      <button
        onClick={handleFavorite}
        className={classNames(
          "w-full py-2 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-gold",
          favorited
            ? "bg-red-600 text-white hover:bg-red-500"
            : "bg-gold text-black hover:bg-yellow-400"
        )}
      >
        {favorited ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </article>
  );
};

export default ProductCard;
