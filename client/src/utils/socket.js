// src/utils/socket.js
// -------------------------------------------------------------
// HANDOFF (Alex -> Team):
// Socket.io client wrapper.
// - Derives socket host from VITE_SOCKET_BASE_URL or VITE_API_BASE_URL_HOST.
// - Queues outgoing messages until connected.
// - Re-sends auth token after reconnect.
// - Provides cleanup utilities.
//
// TODO (future):
// - Add heartbeat ping/pong if needed.
// - Add unified event bus to surface AI stream state globally.
// -------------------------------------------------------------
import { io } from "socket.io-client";

const clean = (v) => v?.trim().replace(/\/+$/, "");

// Prefer explicit socket host; else reuse API host; fallback localhost.
const SOCKET_BASE =
  clean(import.meta.env.VITE_SOCKET_BASE_URL) ||
  clean(import.meta.env.VITE_API_BASE_URL_HOST) ||
  "http://localhost:5000";

let socket = null;
let isConnecting = false;
const messageQueue = [];

// Internal: flush queued emits once connected
function flushQueue() {
  while (messageQueue.length && socket?.connected) {
    const { event, payload } = messageQueue.shift();
    socket.emit(event, payload);
  }
}

function attachCoreHandlers() {
  if (!socket) return;
  socket.on("connect", () => {
    // Re-auth with fresh token each connection
    const token = localStorage.getItem("token");
    if (token) {
      // (Optional) If server had an explicit auth event:
      // socket.emit("auth", { token });
    }
    flushQueue();
    // console.debug("[socket] connected", socket.id);
  });

  socket.on("disconnect", (reason) => {
    // console.warn("[socket] disconnected", reason);
  });

  socket.io.on("reconnect_attempt", (attempt) => {
    // console.debug("[socket] reconnect attempt", attempt);
  });

  socket.io.on("error", (err) => {
    console.error("[socket] io error", err);
  });
}

export function connectSocket() {
  if (socket || isConnecting) return socket;
  isConnecting = true;

  socket = io(SOCKET_BASE, {
    path: "/socket.io",
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 500,
    reconnectionDelayMax: 5000,
    timeout: 20000,
  });

  attachCoreHandlers();
  isConnecting = false;
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
}

// Generic subscribe/unsubscribe helpers
export function on(event, handler) {
  connectSocket().on(event, handler);
  return () => socket?.off(event, handler);
}

// Specialized AI events
export function onAIReplyChunk(handler) {
  return on("aiReplyChunk", handler);
}
export function onAIReplyComplete(handler) {
  return on("aiReplyComplete", handler);
}
export function onAIReplyError(handler) {
  return on("aiReplyError", handler);
}

// Send user message (queues if not connected yet)
export function sendUserMessage(message, token) {
  const payload = { message, token };
  const s = connectSocket();
  if (s.connected) {
    s.emit("userMessage", payload);
  } else {
    messageQueue.push({ event: "userMessage", payload });
  }
}

// Optional: manual force reconnect (e.g. after login)
export function reauth() {
  if (!socket) return;
  const token = localStorage.getItem("token");
  if (token && socket.connected) {
    // socket.emit("auth", { token });
  }
}

// Optional: expose socket id
export function getSocketId() {
  return socket?.id;
}
