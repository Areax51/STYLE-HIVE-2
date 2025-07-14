// vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load all env variables prefixed with VITE_ into `env`
  const env = loadEnv(mode, process.cwd(), "");

  const API_BASE = env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const AI_BASE = env.VITE_AI_BASE_URL || "http://localhost:5000/api/ai";
  const SOCKET_BASE = env.VITE_SOCKET_BASE_URL || "http://localhost:5000";

  return {
    plugins: [react()],
    resolve: {
      alias: {
        // if you want to use absolute imports
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      proxy: {
        // main API
        "/api": {
          target: API_BASE,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api/, "/api"),
        },
        // AI namespace (if you have a separate ai sub-path)
        "/api/ai": {
          target: AI_BASE,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/ai/, "/api/ai"),
        },
        // socket.io
        "/socket.io": {
          target: SOCKET_BASE,
          ws: true,
        },
      },
    },
    // optional: expose env to client code as import.meta.env
    define: {
      "process.env": {},
    },
  };
});
