import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

// simple helper to join classes
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductCard = ({ product }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isFavorited = favorites?.some((f) => f._id === product._id);
  const [imgError, setImgError] = useState(false);

  const handleFavorite = () => {
    isFavorited ? removeFromFavorites(product._id) : addToFavorites(product);
  };

  return (
    <article
      className="bg-white/10 border border-gold rounded-2xl shadow-lg hover:shadow-xl transition p-4 flex flex-col"
      aria-label={`Product card for ${product.name}`}
    >
      <div className="relative mb-4">
        <img
          src={imgError ? "/placeholder-300.png" : product.image}
          alt={product.name}
          className="w-full h-56 object-cover rounded-lg"
          onError={() => setImgError(true)}
        />
        <button
          onClick={handleFavorite}
          aria-pressed={isFavorited}
          aria-label={
            isFavorited
              ? `Remove ${product.name} from favorites`
              : `Add ${product.name} to favorites`
          }
          className={classNames(
            "absolute top-3 right-3 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-gold",
            isFavorited
              ? "bg-red-600 text-white hover:bg-red-500"
              : "bg-black/50 text-gold hover:bg-black/70"
          )}
        >
          <Heart size={24} className={isFavorited ? "fill-current" : ""} />
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
          isFavorited
            ? "bg-red-600 text-white hover:bg-red-500"
            : "bg-gold text-black hover:bg-yellow-400"
        )}
      >
        {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </article>
  );
};

export default ProductCard;
