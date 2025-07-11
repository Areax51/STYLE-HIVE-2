// src/axios.js (or src/api.js)
import axios from "axios";

// Use env variable if set, else fallback to localhost (adjust as needed)
const BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://style-hive-2-production.up.railway.app"; // fallback or use localhost for dev

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor to add JWT token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response Interceptor to catch errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optionally handle auth errors globally
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // Token invalid/expired: logout user or redirect as needed
      localStorage.removeItem("token");
      // window.location.href = "/login"; // Optional: force logout
    }
    return Promise.reject(error);
  }
);

export default api;
