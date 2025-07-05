// client/src/context/FavoritesContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../utils/api";
import { toast } from "react-toastify";

const FavoritesContext = createContext();
export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getFavorites();
        setFavorites(res.data);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        toast.error("Failed to load favorites");
      }
    })();
  }, []);

  const addToFavorites = async (product) => {
    try {
      const res = await addFavorite(product._id);
      setFavorites((prev) => [...prev, res.data]);
      toast.success("Added to favorites");
    } catch (err) {
      console.error("Error adding favorite:", err);
      toast.error("Failed to add to favorites");
    }
  };

  const removeFromFavorites = async (productId) => {
    try {
      await removeFavorite(productId);
      setFavorites((prev) => prev.filter((f) => f._id !== productId));
      toast.info("Removed from favorites");
    } catch (err) {
      console.error("Error removing favorite:", err);
      toast.error("Failed to remove from favorites");
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
