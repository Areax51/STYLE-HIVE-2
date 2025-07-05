import API from "../utils/axios"; // ✅ Preconfigured Axios
import { io } from "socket.io-client";

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

export const addFavorite = (productId) => API.post("/favorites", { productId });

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
