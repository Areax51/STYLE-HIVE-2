```javascript
// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useFavorites } from "../context/FavoritesContext";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [likedChats, setLikedChats] = useState([]);
  const [loadingChats, setLoadingChats] = useState(true);
  const { favorites } = useFavorites();

  useEffect(() => {
    const fetchLikedChats = async () => {
      try {
        const res = await axios.get("/chat/history");
        const liked = res.data.filter((chat) => chat.liked);
        setLikedChats(liked);
      } catch (err) {
        console.error("Failed to fetch liked chats:", err);
        toast.error("Could not load liked chats");
      } finally {
        setLoadingChats(false);
      }
    };

    fetchLikedChats();
  }, []);

  return (
    <section className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-gold mb-8 text-center">
        Your Profile
      </h1>

      {/* Liked AI Chats */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gold mb-4 flex items-center">
          <span className="mr-2">❤️</span> Liked AI Chats
        </h2>

        {loadingChats ? (
          <div className="flex justify-center py-8">
            <Loader2 size={36} className="animate-spin text-gold" />
          </div>
        ) : likedChats.length === 0 ? (
          <p className="text-gray-400">You haven’t liked any AI chats yet.</p>
        ) : (
          <ul className="space-y-6">
            {likedChats.map((chat) => (
              <li
                key={chat._id}
                className="bg-white/10 p-4 rounded-lg border border-gold"
                aria-label="Liked AI chat"
              >
                <p className="text-yellow-400 font-semibold">You:</p>
                <p className="mb-3">{chat.prompt}</p>
                <p className="text-gold font-semibold">StyleHive AI:</p>
                <p>{chat.response}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Favorite Products */}
      <div>
        <h2 className="text-2xl font-semibold text-gold mb-4 flex items-center">
          <span className="mr-2">⭐</span> Favorite Products
        </h2>

        {favorites.length === 0 ? (
          <p className="text-gray-400">No favorite products yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <article
                key={product._id}
                className="bg-white/10 p-4 rounded-2xl border border-gold shadow-sm"
                aria-label={product.name}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                  onError={(e) => { e.currentTarget.src = "/placeholder-300.png"; }}
                />
                <h3 className="text-lg font-semibold text-gold mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-white/80 font-bold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(product.price)}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
```;
