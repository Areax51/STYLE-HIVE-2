import { useState } from "react";
import { useAIChat } from "../hooks/useAiChat";
import TypingDots from "./TypingDots";
import { Heart, Tag } from "lucide-react";

const AIChatBox = () => {
  const [input, setInput] = useState("");
  const { messages, stream, loading, sendMessage } = useAIChat({
    loadHistory: true,
  });

  const handleSend = () => {
    sendMessage(input);
    setInput("");
  };

  const toggleLike = async (id, liked) => {
    // your existing patch logic…
  };

  return (
    <div className="w-full max-w-4xl h-[80vh] mx-auto bg-black text-white rounded-2xl p-4 flex flex-col">
      <div className="flex-1 overflow-auto space-y-6 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="space-y-2">
            <p className="text-gold font-bold">You:</p>
            <p>{msg.prompt}</p>

            {(msg.response || (i === messages.length - 1 && stream)) && (
              <div className="bg-white/10 p-4 rounded-xl border border-gold">
                <div className="flex justify-between">
                  <div>
                    <p className="text-gold font-bold">StyleHive AI:</p>
                    <p>{msg.response ?? stream}</p>
                    {msg.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-1 bg-yellow-600/20 text-yellow-300 text-xs font-semibold rounded-full mr-2"
                      >
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  {msg._id && (
                    <Heart
                      className={`cursor-pointer text-gold ${
                        msg.liked ? "fill-gold" : ""
                      }`}
                      onClick={() => toggleLike(msg._id, msg.liked)}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2">
            <p className="text-gold font-bold">AI:</p>
            <TypingDots />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-gray-800 p-3 rounded border border-gold text-white"
          placeholder="Ask me for style advice…"
        />
        <button
          onClick={handleSend}
          className="px-5 py-2 bg-gold text-black font-bold rounded hover:bg-yellow-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChatBox;
