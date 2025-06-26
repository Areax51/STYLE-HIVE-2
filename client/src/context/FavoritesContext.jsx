// src/context/FavoritesContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user && token) {
        try {
          const res = await axios.get(`/api/favorites/${user._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFavorites(res.data); // full product objects
        } catch (err) {
          console.error("❌ Fetch favorites failed:", err.message);
        }
      }
    };
    fetchFavorites();
  }, [user, token]);
  const addToFavorites = async (product) => {
    try {
      await axios.post(
        `/api/favorites/${user._id}`,
        {
          productId: product._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFavorites((prev) => [...prev, product]);
    } catch (err) {
      console.error(
        "Add to favorites failed:",
        err.response?.data || err.message
      );
    }
  };

  const removeFromFavorites = async (productId) => {
    try {
      await axios.delete(`/api/favorites/${user._id}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("Remove from favorites failed:", err.message);
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
