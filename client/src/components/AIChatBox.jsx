import { useState, useEffect, useRef } from "react";
import { useAIChat } from "../hooks/useAiChat";
import TypingDots from "./TypingDots";
import { Heart, Tag } from "lucide-react";
import API from "../utils/api"; // <-- adjust this path to your axios instance

const AIChatBox = () => {
  const [input, setInput] = useState("");
  const { messages, stream, loading, sendMessage } = useAIChat({
    loadHistory: true,
  });
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
    setInput("");
  };

  // scroll to bottom whenever messages or stream changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, stream, loading]);

  const toggleLike = async (id, liked) => {
    try {
      // flips like status on the server
      await API.patch(`/chat/${id}/like`);
      // assume your hook re‑fetches or updates its internal state
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  return (
    <section className="flex flex-col w-full max-w-4xl h-[80vh] mx-auto bg-black text-white rounded-2xl p-4">
      <div className="flex-1 overflow-y-auto space-y-6 mb-4">
        {messages.map((msg, idx) => (
          <div key={msg._id ?? idx} className="space-y-2">
            {/* User prompt */}
            <div>
              <p className="text-gold font-bold">You:</p>
              <p>{msg.prompt}</p>
            </div>

            {/* AI response or streaming text */}
            {(msg.response || (idx === messages.length - 1 && stream)) && (
              <div className="bg-white/10 p-4 rounded-xl border border-gold flex justify-between">
                <div className="space-y-2">
                  <p className="text-gold font-bold">StyleHive AI:</p>
                  <p>{msg.response ?? stream}</p>
                  <div className="flex flex-wrap gap-2">
                    {msg.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 bg-yellow-600/20 text-yellow-300 text-xs font-semibold rounded-full"
                      >
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Like button */}
                {msg._id && (
                  <button
                    onClick={() => toggleLike(msg._id, msg.liked)}
                    aria-label={msg.liked ? "Unlike message" : "Like message"}
                  >
                    <Heart
                      size={20}
                      className={`cursor-pointer text-gold ${
                        msg.liked ? "fill-gold" : ""
                      }`}
                    />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Loading / typing indicator */}
        {loading && (
          <div className="flex items-center space-x-2">
            <p className="text-gold font-bold">AI:</p>
            <TypingDots />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input & send */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          aria-label="Chat input"
          className="flex-1 bg-gray-800 p-3 rounded border border-gold text-white focus:outline-none"
          placeholder="Ask me for style advice…"
        />
        <button
          onClick={handleSend}
          aria-label="Send message"
          className="px-5 py-2 bg-gold text-black font-bold rounded hover:bg-yellow-500 focus:outline-none"
        >
          Send
        </button>
      </div>
    </section>
  );
};

export default AIChatBox;
