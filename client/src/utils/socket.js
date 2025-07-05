// client/src/utils/socket.js
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false,
});

export default socket;

// Helpers
export const connectSocket = () => {
  if (!socket.connected) socket.connect();
};
export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};

// AI Chat events
export const onUserMessage = (cb) => socket.on("userMessage", cb);
export const onAIReplyChunk = (cb) => socket.on("aiReplyChunk", cb);
export const onAIReplyComplete = (cb) => socket.on("aiReplyComplete", cb);
export const onAIReplyError = (cb) => socket.on("aiReplyError", cb);

// Emit
export const sendUserMessage = (msg, token) =>
  socket.emit("userMessage", { message: msg, token });

// Connection events
export const onConnect = (cb) => socket.on("connect", cb);
export const onDisconnect = (cb) => socket.on("disconnect", cb);
export const onConnectError = (cb) => socket.on("connect_error", cb);
export const onReconnect = (cb) => socket.on("reconnect", cb);
export const onError = (cb) => socket.on("error", cb);
