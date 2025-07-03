// src/utils/socket.js
import { io } from "socket.io-client";

// ✅ Create socket connection with credentials
const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true, // Needed if backend uses credentials
});

export default socket;

// ✅ Connection management
export const connectSocket = () => {
  if (!socket.connected) socket.connect();
};

export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};

// ✅ AI Event Handlers
export const onUserMessage = (callback) => {
  socket.on("userMessage", callback);
};

export const onAIReplyChunk = (callback) => {
  socket.on("aiReplyChunk", callback);
};

export const onAIReplyComplete = (callback) => {
  socket.on("aiReplyComplete", callback);
};

export const onAIReplyError = (callback) => {
  socket.on("aiReplyError", callback);
};

// ✅ Emit message to AI
export const sendUserMessage = (message, token) => {
  socket.emit("userMessage", { message, token });
};

// ✅ Lifecycle and Error Events
export const onConnect = (callback) => socket.on("connect", callback);
export const onDisconnect = (callback) => socket.on("disconnect", callback);
export const onConnectError = (callback) =>
  socket.on("connect_error", callback);
export const onConnectTimeout = (callback) =>
  socket.on("connect_timeout", callback);
export const onReconnect = (callback) => socket.on("reconnect", callback);
export const onReconnectAttempt = (callback) =>
  socket.on("reconnect_attempt", callback);
export const onReconnectError = (callback) =>
  socket.on("reconnect_error", callback);
export const onReconnectFailed = (callback) =>
  socket.on("reconnect_failed", callback);
export const onReconnectSuccess = (callback) =>
  socket.on("reconnect_success", callback);
export const onPing = (callback) => socket.on("ping", callback);
export const onPong = (callback) => socket.on("pong", callback);
export const onError = (callback) => socket.on("error", callback);
