// src/api.js
import API from "./axios";

// ─── AUTH ───────────────────────────────────────────────────────
export const registerUser = (data) => API.post("/api/auth/register", data);
export const loginUser = (data) => API.post("/api/auth/login", data);

// ─── PRODUCTS ──────────────────────────────────────────────────
export const fetchProducts = () => API.get("/api/products");
export const fetchProductById = (id) => API.get(`/api/products/${id}`);

// ─── FAVORITES ─────────────────────────────────────────────────
export const getFavorites = () => API.get("/api/favorites");
export const addFavorite = (id) =>
  API.post("/api/favorites", { productId: id });
export const removeFavorite = (id) => API.delete(`/api/favorites/${id}`);

// ─── CART ─────────────────────────────────────────────────────
export const addToCart = (userId, product) =>
  API.post("/api/cart/add", { userId, product });
export const getCart = (userId) => API.get(`/api/cart/${userId}`);

// ─── AI CHAT ───────────────────────────────────────────────────
export const sendChatMessage = (msg) => API.post("/api/chat", { message: msg });
export const getChatHistory = () => API.get("/api/chat/history");
export const uploadImageForAI = (form) =>
  API.post("/api/chat/image", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ─── SOCKET.IO ─────────────────────────────────────────────────
export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_BASE_URL?.trim() || "http://localhost:5000";

export default {
  registerUser,
  loginUser,
  fetchProducts,
  fetchProductById,
  getFavorites,
  addFavorite,
  removeFavorite,
  addToCart,
  getCart,
  sendChatMessage,
  getChatHistory,
  uploadImageForAI,
  SOCKET_URL,
};
