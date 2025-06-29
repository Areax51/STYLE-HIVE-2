import axios from "axios";

// 🔧 Base API setup
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Example: http://localhost:5000/api
});

// 🔒 Automatically attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

//
// ✅ AUTH
//
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);

//
// ✅ PRODUCTS
//
export const fetchProducts = () => API.get("/products");

//
// ✅ FAVORITES (uses token, not userId anymore)
//
export const getFavorites = () => API.get("/favorites");

export const addFavorite = (productId) =>
  API.post("/favorites", { product: productId });

export const removeFavorite = (productId) =>
  API.delete(`/favorites/${productId}`);

//
// ✅ AI CHAT
//
export const sendChatMessage = (message) => API.post("/chat", { message });

export const getChatHistory = () => API.get("/chat/history");

export const uploadImageForAI = (formData) =>
  API.post("/chat/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

//
// ✅ MESSAGES (optional)
//
export const sendMessage = (data) => API.post("/messages", data);
export const getConversation = (userId) => API.get(`/messages/${userId}`);

export default API;
