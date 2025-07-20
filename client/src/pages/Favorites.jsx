import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import ProductCard from "../components/ProductCard";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("/favorites");
        setFavorites(res.data.favorites || res.data);
      } catch (err) {
        console.error("Failed to load favorites:", err);
        toast.error("Could not load favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-gold" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-gold mb-8 text-center">
        Your Favorites
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-400 text-center">
          No favorite products saved yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;
