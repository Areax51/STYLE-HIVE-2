import React from "react";
import AIChatBox from "../components/AIChatBox";

const Chat = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col items-center px-4 py-10 sm:px-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-400 font-[Orbitron]">
          Talk to StyleHive AI
        </h1>
        <p className="text-gray-400 text-md sm:text-lg font-outfit mt-2">
          Get fashion advice, outfit suggestions, and personalized style help.
        </p>
      </div>

      <div className="w-full max-w-5xl h-[75vh] overflow-hidden rounded-2xl border border-yellow-400 bg-black/50 shadow-xl backdrop-blur-md p-4 sm:p-6">
        <div className="h-full overflow-y-auto">
          <AIChatBox />
        </div>
      </div>
    </div>
  );
};

export default Chat;
