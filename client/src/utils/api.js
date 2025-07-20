// src/api.js
// -------------------------------------------------------------
// HANDOFF: Central API wrapper functions.
// Assumes axios baseURL already ends in /api.
// Therefore: NO '/api' prefix in these paths.
// Favorites endpoints use PRODUCT ID for removal (server expects productId).
// -------------------------------------------------------------
import API from "./axios";

// ─── AUTH ─────────────────────────────────────────────
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// ─── PRODUCTS ────────────────────────────────────────
export const fetchProducts = () => API.get("/products");
export const fetchProductById = (id) => API.get(`/products/${id}`);

// ─── FAVORITES (productId-based) ─────────────────────
export const getFavorites = () => API.get("/favorites");
export const addFavorite = (productId) => API.post("/favorites", { productId });
export const removeFavorite = (productId) =>
  API.delete(`/favorites/${productId}`);

// ─── CART ────────────────────────────────────────────
export const addToCart = (userId, product) =>
  API.post("/cart/add", { userId, product });
export const getCart = (userId) => API.get(`/cart/${userId}`);

// ─── AI CHAT (same base for now) ─────────────────────
export const sendChatMessage = (message) => API.post("/chat", { message });
export const getChatHistory = () => API.get("/chat/history");
export const uploadImageForAI = (form) =>
  API.post("/chat/image", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ─── SOCKET.IO URL ───────────────────────────────────
// If no explicit socket host, derive from API base by stripping /api
const SOCKET_URL =
  import.meta.env.VITE_SOCKET_BASE_URL?.trim() ||
  (API.defaults.baseURL
    ? API.defaults.baseURL.replace(/\/api\/?$/, "")
    : "http://localhost:5000");

export { SOCKET_URL };

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
