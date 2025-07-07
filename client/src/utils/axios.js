// client/src/utils/axios.js
import axios from "axios";

// Use ONLY one consistent baseURL—should end with `/api`!
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g., https://style-hive-2-production.up.railway.app/api
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;

// Helper for direct auth header setting (not usually needed, but ok)
export const setAuthToken = (token) => {
  if (token) API.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete API.defaults.headers.common.Authorization;
};
export const clearAuthToken = () => {
  delete API.defaults.headers.common.Authorization;
};
export const getAuthToken = () => {
  // Optionally get the auth token from Axios config (rarely needed)
  return API.defaults.headers.common.Authorization?.replace("Bearer ", "");
};

// If you want to get the backend URL or socket URL from the env:
export const getApiBaseUrl = () => import.meta.env.VITE_API_URL;
export const getSocketUrl = () => import.meta.env.VITE_SOCKET_URL;
export const getClientUrl = () => import.meta.env.VITE_CLIENT_URL;
