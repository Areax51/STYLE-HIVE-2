import API from "../utils/axios"; // ✅ Preconfigured Axios
import { io } from "socket.io-client";

// AUTH
export const registerUser = (userData) =>
  API.post("/api/auth/register", userData);
export const loginUser = (userData) => API.post("/api/auth/login", userData);

// PRODUCTS
export const fetchProducts = () => API.get("/api/products");

// FAVORITES (uses token)
export const getFavorites = () => API.get("/api/favorites");
export const addFavorite = (productId) =>
  API.post("/api/favorites", { productId });
export const removeFavorite = (productId) =>
  API.delete(`/api/favorites/${productId}`);

// AI CHAT
export const sendChatMessage = (message) => API.post("/api/chat", { message });
export const getChatHistory = () => API.get("/api/chat/history");
export const uploadImageForAI = (formData) =>
  API.post("/api/chat/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// MESSAGES (optional)
export const sendMessage = (data) => API.post("/api/messages", data);
export const getConversation = (userId) => API.get(`/api/messages/${userId}`);

export default API;
