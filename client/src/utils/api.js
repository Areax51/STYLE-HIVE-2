import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);
export const fetchProducts = () => API.get("/products");
export const getFavorites = (userId) => API.get(`/favorites/${userId}`);
export const addFavorite = (userId, productId) =>
  API.post(`/favorites/${userId}`, { productId });
export const removeFavorite = (userId, productId) =>
  API.delete(`/favorites/${userId}/${productId}`);
export const sendChatMessage = (message) => API.post("/chat", { message }); // ✅ API instance already includes token via interceptor

export const getChatHistory = () => API.get("/chat/history");
export const uploadImageForAI = (formData) =>
  API.post("/chat/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const sendMessage = (data) => API.post("/messages", data);
export const getConversation = (userId) => API.get(`/messages/${userId}`);

export default API;
