import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Fetch all favorites on login
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`/api/favorites/${user._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFavorites(res.data); // full product objects
        } catch (err) {
          console.error("Failed to load favorites:", err);
        }
      }
    };
    fetchFavorites();
  }, [user]);

  const addToFavorites = async (product) => {
    if (!user) return;
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/api/favorites/${user._id}`,
        { productId: product._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFavorites((prev) => [...prev, product]);
    } catch (err) {
      console.error("Failed to add favorite:", err);
    }
  };

  const removeFromFavorites = async (productId) => {
    if (!user) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/favorites/${user._id}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
