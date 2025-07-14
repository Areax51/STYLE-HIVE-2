// src/axios.js
import axios from "axios";

// Use REACT_APP_API_URL if explicitly set; otherwise default to relative /api
const BASE_URL = process.env.REACT_APP_API_URL?.trim()
  ? process.env.REACT_APP_API_URL
  : "/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false, // set true only if you use cookies
});

// Attach JWT automatically if present
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: handle auth globally
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem("token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
