import { useEffect, useState } from "react";
import axios from "axios";
import { useFavorites } from "../context/FavoritesContext";

const Profile = () => {
  const [likedChats, setLikedChats] = useState([]);
  const { favorites } = useFavorites();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLikedChats = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/chat/history`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const liked = res.data.filter((chat) => chat.liked);
        setLikedChats(liked);
      } catch (err) {
        console.error("❌ Failed to fetch liked chats:", err.message);
      }
    };

    fetchLikedChats();
  }, [token]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-gold mb-6">Your Profile</h1>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gold">
          ❤️ Liked AI Chats
        </h2>
        {likedChats.length === 0 ? (
          <p className="text-gray-400">You haven’t liked any AI chats yet.</p>
        ) : (
          <ul className="space-y-4">
            {likedChats.map((chat) => (
              <li
                key={chat._id}
                className="bg-white/5 p-4 rounded-lg border border-gold"
              >
                <p className="text-yellow-400 font-semibold">You:</p>
                <p className="mb-2">{chat.prompt}</p>
                <p className="text-gold font-semibold">StyleHive AI:</p>
                <p>{chat.response}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gold">
          ⭐ Favorite Products
        </h2>
        {favorites.length === 0 ? (
          <p className="text-gray-400">No favorite products yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((product) => (
              <div
                key={product._id}
                className="bg-white/10 p-4 rounded-lg border border-gold"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-3"
                />
                <h3 className="text-lg font-bold text-gold">{product.name}</h3>
                <p className="text-sm">${product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
