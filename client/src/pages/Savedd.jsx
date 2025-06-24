import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Saved = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/users/favorites",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFavorites(res.data.favorites);
      } catch (error) {
        console.error("Failed to load favorites", error);
      }
    };

    fetchFavorites();
  }, []);

  const removeFromFavorites = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/users/favorites/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing item", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-black to-zinc-900 min-h-screen text-white px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gold">
        Saved Styles
      </h2>

      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-gray-400"
        >
          <p>No saved items yet.</p>
          <Link to="/products" className="text-gold underline">
            Browse styles
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-zinc-800 rounded-2xl p-4 shadow-lg hover:shadow-gold transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-400">{item.description}</p>
              <p className="text-gold font-bold mt-2">${item.price}</p>
              <div className="mt-4 flex gap-3">
                <button
                  className="bg-gold text-black px-4 py-1 rounded hover:bg-yellow-500"
                  onClick={() => removeFromFavorites(item._id)}
                >
                  Remove
                </button>
                <Link
                  to={`/products/${item._id}`}
                  className="border border-gold text-gold px-4 py-1 rounded hover:bg-gold hover:text-black transition"
                >
                  View
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;
