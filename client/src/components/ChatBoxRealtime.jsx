import { useState, useEffect, useRef } from "react";
import { useAIChat } from "../hooks/useAiChat"; // adjust path if needed

const ChatBoxRealtime = () => {
  const [input, setInput] = useState("");
  const { messages, stream, matched, sendMessage } = useAIChat({
    liveMatching: true,
  });
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
    setInput("");
  };

  // scroll to bottom on new content
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, stream, matched]);

  return (
    <section className="flex flex-col h-[90vh] max-w-5xl mx-auto bg-black text-white p-6">
      <div className="flex-1 overflow-y-auto space-y-6 mb-4">
        {messages.map((msg, idx) => (
          <article key={msg._id ?? idx} className="space-y-2">
            <div>
              <p className="text-gold font-bold">You:</p>
              <p>{msg.prompt}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg border border-gold">
              <p className="text-gold font-bold">StyleHive AI:</p>
              <p>
                {msg.response ?? (idx === messages.length - 1 ? stream : "")}
              </p>
            </div>
          </article>
        ))}

        {stream && matched.length > 0 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {matched.map((p) => (
              <div
                key={p._id}
                className="bg-white/10 border border-gold p-4 rounded-lg"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-32 object-cover mb-2 rounded"
                />
                <p className="font-semibold text-gold">{p.name}</p>
                <p className="text-sm text-gray-300">${p.price}</p>
              </div>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 mt-auto">
        <input
          type="text"
          aria-label="Chat input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-gray-800 p-3 rounded border border-gold text-white focus:outline-none"
          placeholder="Ask your stylist anything..."
        />
        <button
          onClick={handleSend}
          aria-label="Send message"
          className="px-6 py-2 bg-gold text-black font-bold rounded hover:bg-yellow-400 focus:outline-none"
        >
          Send
        </button>
      </div>
    </section>
  );
};

export default ChatBoxRealtime;
