import React from "react";
import AIChatBox from "../components/AIChatBox";

const Chat = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col items-center px-4 py-12 sm:px-8">
      <header className="text-center mb-8">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gold font-Orbitron">
          Talk to StyleHive AI
        </h1>
        <p className="mt-2 text-gray-300 text-lg font-Outfit">
          Get fashion advice, outfit suggestions, and personalized style help.
        </p>
      </header>

      <div className="w-full max-w-5xl h-[75vh] overflow-hidden rounded-2xl border border-gold bg-black/50 shadow-xl backdrop-blur-md p-4 sm:p-6">
        <div className="h-full overflow-y-auto">
          <AIChatBox />
        </div>
      </div>
    </section>
  );
};

export default Chat;
