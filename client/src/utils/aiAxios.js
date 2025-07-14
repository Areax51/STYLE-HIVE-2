// src/aiAxios.js
import axios from "axios";

// Use VITE_AI_BASE_URL if set, otherwise fall back to your same API host
const AI_BASE =
  import.meta.env.VITE_AI_BASE_URL?.trim() ||
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  "/api";

const aiApi = axios.create({
  baseURL: AI_BASE,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

aiApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default aiApi;
