import React from "react";
import ChatBox from "../components/ChatBox";

const Chat = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gold mb-6">
        StyleHive AI Assistant
      </h1>
      <ChatBox />
    </div>
  );
};

export default Chat;
