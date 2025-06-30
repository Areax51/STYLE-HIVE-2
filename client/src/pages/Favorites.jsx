import { useEffect, useState } from "react";
import axios from "../utils/axios"; // Use your axios wrapper
import ProductCard from "../components/ProductCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("/api/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(res.data);
      } catch (err) {
        console.error("❌ Failed to load favorites:", err.message);
        setError("Could not load favorites.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading)
    return <div className="text-center mt-10 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-gold mb-6">Your Favorites</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {favorites.length === 0 ? (
        <p className="text-gray-400">No favorite products saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
