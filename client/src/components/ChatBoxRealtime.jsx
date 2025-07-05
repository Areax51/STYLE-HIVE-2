import { useState } from "react";
import { useAIChat } from "../hooks/useAiChat"; // Adjust the import path as needed

const ChatBoxRealtime = () => {
  const [input, setInput] = useState("");
  const { messages, stream, matched, sendMessage } = useAIChat({
    liveMatching: true,
  });

  const handleSend = () => {
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="h-[90vh] bg-black text-white p-6 flex flex-col max-w-5xl mx-auto">
      <div className="flex-1 overflow-y-auto space-y-6 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="space-y-2">
            <p className="text-gold font-bold">You:</p>
            <p>{msg.prompt}</p>
            <div className="bg-white/10 p-4 rounded-lg border border-gold">
              <p className="text-gold font-bold">StyleHive AI:</p>
              <p>{msg.response ?? (i === messages.length - 1 && stream)}</p>
            </div>
          </div>
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
      </div>

      <div className="flex gap-2 mt-auto">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-gray-800 p-3 rounded border border-gold text-white"
          placeholder="Ask your stylist anything..."
        />
        <button
          onClick={handleSend}
          className="px-6 py-2 bg-gold text-black font-bold rounded hover:bg-yellow-400"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBoxRealtime;
