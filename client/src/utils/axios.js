import axios from "axios";

const instance = axios.create({
  baseURL: "https://style-hive-2-production.up.railway.app/api", // ✅ New Railway backend
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach token to each request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;

export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

export const clearAuthToken = () => {
  delete instance.defaults.headers.common["Authorization"];
};

export const setBaseURL = (url) => {
  instance.defaults.baseURL = url;
};

export const getBaseURL = () => {
  return instance.defaults.baseURL;
};
