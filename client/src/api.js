// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 🔐 Auth
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);

// 👕 Products
export const fetchProducts = () => API.get("/products");

// ❤️ Favorites
export const getFavorites = (userId) => API.get(`/favorites/${userId}`);
export const addFavorite = (userId, productId) =>
  API.post(`/favorites/${userId}`, { productId });
export const removeFavorite = (userId, productId) =>
  API.delete(`/favorites/${userId}/${productId}`);

// 💬 Chat AI
export const sendChatMessage = (message) => API.post("/chat", { message });
export const getChatHistory = () => API.get("/chat/history");

// 🖼 AI Vision
export const uploadImageForAI = (formData) =>
  API.post("/chat/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// 📩 Messaging
export const sendMessage = (data) => API.post("/messages", data);
export const getConversation = (userId) => API.get(`/messages/${userId}`);

export default API;
