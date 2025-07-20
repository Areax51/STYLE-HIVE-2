// src/aiAxios.js
// -------------------------------------------------------------
// HANDOFF: AI-specific axios instance.
// Uses same HOST unless VITE_AI_BASE_URL_HOST overrides.
// Base aligns with /api for now (same service).
// Split in future if AI service is separated.
// -------------------------------------------------------------
import axios from "axios";
import { API_HOST } from "./axios";

const clean = (h) => h?.trim().replace(/\/+$/, "");

const AI_HOST = clean(import.meta.env.VITE_AI_BASE_URL_HOST) || clean(API_HOST);

export const AI_BASE_URL = `${AI_HOST}/api`;

const aiApi = axios.create({
  baseURL: AI_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

aiApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

aiApi.interceptors.response.use(
  (r) => r,
  (e) => {
    if (e?.response?.status === 401) {
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("auth:logout"));
    }
    return Promise.reject(e);
  }
);

export default aiApi;
