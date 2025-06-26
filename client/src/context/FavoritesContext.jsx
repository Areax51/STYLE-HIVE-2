import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // assumes user info is stored after login

  // 🔁 Fetch user favorites on login
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `/api/favorites/${user._id}`,
          { product }, // instead of { productId }
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFavorites((prev) => [...prev, product]); // add full product, not just ID
      }
    };
    fetchFavorites();
  }, [user]);

  const addToFavorites = async (productId) => {
    if (!user) return;
    const token = localStorage.getItem("token");

    await axios.post(
      `/api/favorites/${user._id}`,
      { productId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setFavorites((prev) => [...prev, { _id: productId }]); // simplified
  };

  const removeFromFavorites = async (productId) => {
    if (!user) return;
    const token = localStorage.getItem("token");

    await axios.delete(`/api/favorites/${user._id}/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setFavorites((prev) => prev.filter((item) => item._id !== productId));
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
