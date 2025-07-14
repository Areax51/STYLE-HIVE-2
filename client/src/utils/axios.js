// src/axios.js
import axios from "axios";

// Point at your server root (no /api here)
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL_HOST?.trim() || "http://localhost:5000";

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auto-attach JWT if there
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
