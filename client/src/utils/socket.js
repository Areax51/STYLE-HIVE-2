// src/utils/socket.js
import { io } from "socket.io-client";

// Use the same host you set above (no /api)
const SOCKET_BASE =
  import.meta.env.VITE_SOCKET_BASE_URL?.trim() || "http://localhost:5000";

let socket = null;

export function connectSocket() {
  if (!socket) {
    socket = io(SOCKET_BASE, {
      path: "/socket.io",
      transports: ["websocket"],
    });
  }
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function onAIReplyChunk(handler) {
  connectSocket().on("aiReplyChunk", handler);
}

export function onAIReplyComplete(handler) {
  connectSocket().on("aiReplyComplete", handler);
}

export function onAIReplyError(handler) {
  connectSocket().on("aiReplyError", handler);
}

export function sendUserMessage(message, token) {
  connectSocket().emit("userMessage", { message, token });
}
