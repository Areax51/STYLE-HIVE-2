import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("/api/chat/history", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const liked = res.data.filter((msg) => msg.liked);
        setFavorites(liked);
      } catch (err) {
        console.error("Error fetching favorites:", err.message);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-gold mb-6">Your Favorite Looks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((fav) => {
          const productMatch = fav.response.match(
            /\b[A-Z][a-z]+(?: [A-Z][a-z]+)*\b/
          );
          return (
            <div
              key={fav._id}
              className="bg-white/10 backdrop-blur-md border border-gold rounded-xl p-4 shadow-gold flex flex-col justify-between"
            >
              <div>
                <h2 className="text-gold text-lg font-semibold mb-2">
                  You: {fav.prompt}
                </h2>
                <p className="text-sm leading-relaxed mb-3">{fav.response}</p>
              </div>
              {productMatch && (
                <Link
                  to={`/search?query=${encodeURIComponent(productMatch[0])}`}
                  className="text-yellow-400 hover:underline text-sm mt-auto"
                >
                  Find "{productMatch[0]}"
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
