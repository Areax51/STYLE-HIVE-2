import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-gold mb-6">Live Chat 💬</h1>

      <div className="w-full max-w-md bg-futuristic-gray rounded p-4 mb-4">
        {messages.map((msg, i) => (
          <p key={i} className="text-gold">
            {msg}
          </p>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 rounded bg-futuristic-gray border border-gold text-white w-72"
        />
        <button
          onClick={sendMessage}
          className="bg-gold text-black px-4 py-2 rounded font-bold"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
