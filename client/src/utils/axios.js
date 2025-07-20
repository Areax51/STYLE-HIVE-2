// src/axios.js
// -------------------------------------------------------------
// HANDOFF (Alex -> Team)
// Global axios instance.
// Env: VITE_API_BASE_URL_HOST = root host WITHOUT trailing slash.
// Example: https://style-hive-2-production.up.railway.app
// Base URL becomes `${HOST}/api` so all wrapper paths omit `/api`.
//
// If switching to cookie-based auth later: set withCredentials + server CORS changes.
// -------------------------------------------------------------
import axios from "axios";

function cleanHost(host) {
  return host?.trim().replace(/\/+$/, "");
}

const RAW_HOST =
  cleanHost(import.meta.env.VITE_API_BASE_URL_HOST) || "http://localhost:5000";

export const API_HOST = RAW_HOST;
export const API_BASE_URL = `${API_HOST}/api`;

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global 401 handler
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("auth:logout"));
    }
    return Promise.reject(err);
  }
);

export default API;
