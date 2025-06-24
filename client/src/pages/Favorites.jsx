import React from "react";
import { useFavorites } from "../context/FavoritesContext";

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-gold mb-6 text-center">
        Saved Favorites
      </h1>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-400">
          You haven’t saved anything yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <div key={product._id} className="bg-gray-800 p-4 rounded-xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h2 className="text-xl font-semibold text-gold">
                {product.name}
              </h2>
              <p className="text-sm text-gray-300 mb-2">
                {product.description}
              </p>
              <p className="text-lg font-bold">${product.price}</p>
              <button
                onClick={() => removeFromFavorites(product._id)}
                className="mt-2 w-full bg-red-600 text-white rounded-lg py-1 hover:bg-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
