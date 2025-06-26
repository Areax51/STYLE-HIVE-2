import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import TypingDots from "./TypingDots";
import { Heart } from "lucide-react";

// ✅ Use deployed WebSocket URL
const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ["websocket"],
});

const AIChatBox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentStream, setCurrentStream] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentStream]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chatRes, productRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/chat/history`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/products`),
        ]);
        setMessages(chatRes.data.reverse());
        setProducts(productRes.data);
      } catch (err) {
        console.error("Error loading data", err.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    socket.on("aiReplyChunk", (chunk) => {
      setCurrentStream((prev) => prev + chunk);
    });

    socket.on("aiReplyComplete", async (fullReply) => {
      setLoading(false);
      const lastUserMsg = messages[messages.length - 1];

      const newChat = {
        ...lastUserMsg,
        response: fullReply,
      };

      setMessages((prev) => [...prev.slice(0, -1), newChat]);
      setCurrentStream("");
    });

    socket.on("aiReplyError", (err) => {
      console.error("AI Error:", err);
      setLoading(false);
      setCurrentStream("");
    });

    return () => {
      socket.off("aiReplyChunk");
      socket.off("aiReplyComplete");
      socket.off("aiReplyError");
    };
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg = { prompt: input, response: null };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setCurrentStream("");
    setLoading(true);

    socket.emit("userMessage", {
      message: input,
      token: localStorage.getItem("token"),
    });
  };

  const getProductFromResponse = (text) => {
    return products.find((p) =>
      text.toLowerCase().includes(p.name.toLowerCase())
    );
  };

  return (
    <div className="w-full max-w-4xl h-[80vh] mx-auto bg-black text-white rounded-2xl shadow-gold border border-gold p-4 sm:p-6 flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-6 mb-4 pr-2 scrollbar-thin scrollbar-thumb-gold scrollbar-track-gray-800">
        {messages.map((msg, i) => {
          const product = msg.response && getProductFromResponse(msg.response);
          return (
            <div key={i} className="space-y-2">
              <div>
                <p className="text-gold font-bold">You:</p>
                <p>{msg.prompt}</p>
              </div>
              {msg.response && (
                <div className="bg-white/10 p-4 rounded-xl border border-gold">
                  <div className="flex justify-between items-start">
                    <div className="text-white space-y-2 flex-1">
                      <p className="text-gold font-bold">StyleHive AI:</p>
                      <p>{msg.response}</p>
                      {product && (
                        <div className="mt-3 border border-gold rounded-xl overflow-hidden flex flex-col sm:flex-row">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full sm:w-40 h-40 object-cover"
                          />
                          <div className="p-4">
                            <h3 className="text-lg font-bold text-gold">
                              {product.name}
                            </h3>
                            <p className="text-sm">${product.price}</p>
                            <a
                              href={`/product/${product._id}`}
                              className="text-yellow-400 hover:underline text-sm mt-2 block"
                            >
                              View product
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                    <Heart className="text-gold" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {loading && (
          <div className="bg-white/10 p-4 rounded-xl border border-gold">
            <p className="text-gold font-bold">StyleHive AI:</p>
            <p className="italic text-gray-300">{currentStream}</p>
            <TypingDots />
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask about a look, outfit, or product..."
          className="flex-1 p-3 rounded-lg bg-gray-800 border border-gold text-white focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="px-5 py-2 bg-gold text-black font-bold rounded-lg hover:bg-yellow-400 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChatBox;
