// src/context/FavoritesContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../utils/api"; // ✅ use your new api.js wrapper

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch favorites once token is available
  useEffect(() => {
    if (!token) return;
    const fetchFavorites = async () => {
      try {
        const res = await getFavorites();
        setFavorites(res.data); // product objects returned from backend
      } catch (err) {
        console.error("❌ Fetch favorites failed:", err.message);
      }
    };
    fetchFavorites();
  }, [token]);

  const addToFavorites = async (product) => {
    if (!token) return;
    try {
      const res = await addFavorite(product._id);
      setFavorites((prev) => [...prev, res.data]); // Add full product
    } catch (err) {
      console.error(
        "Add to favorites failed:",
        err.response?.data || err.message
      );
    }
  };

  const removeFromFavorites = async (productId) => {
    if (!token) return;
    try {
      await removeFavorite(productId);
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
