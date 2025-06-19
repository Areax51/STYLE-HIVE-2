import { useState, useEffect } from "react";
import axios from "axios";
import TypingDots from "./TypingDots";
import { Heart } from "lucide-react";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chatRes, productRes] = await Promise.all([
          axios.get("/api/chat/history", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get("/api/products"),
        ]);
        setMessages(chatRes.data.reverse());
        setProducts(productRes.data);
      } catch (err) {
        console.error("Error fetching chat or products:", err.message);
      }
    };

    fetchData();
  }, []);

  const getProductFromResponse = (text) => {
    return products.find((p) =>
      text.toLowerCase().includes(p.name.toLowerCase())
    );
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { prompt: input, response: null };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "/api/chat",
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const aiReply = res.data.reply;
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { ...userMessage, response: aiReply, _id: res.data.id },
      ]);
    } catch (err) {
      console.error("Chat failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (id, current) => {
    try {
      await axios.patch(
        `/api/chat/${id}`,
        { liked: !current },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, liked: !current } : m))
      );
    } catch (err) {
      console.error("Failed to toggle like", err.message);
    }
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
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-gold">
                  <div className="flex justify-between items-start">
                    <div className="text-white space-y-2 flex-1">
                      <p className="text-gold font-bold">StyleHive AI:</p>
                      <p className="leading-relaxed">{msg.response}</p>
                      {product && (
                        <div className="mt-3 border border-gold rounded-xl overflow-hidden flex flex-col sm:flex-row shadow-md hover:scale-[1.02] transition-transform">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full sm:w-40 h-40 object-cover"
                          />
                          <div className="p-4 flex flex-col justify-between">
                            <h3 className="text-lg font-bold text-gold">
                              {product.name}
                            </h3>
                            <p className="text-sm">${product.price}</p>
                            <a
                              href={`/product/${product._id}`}
                              className="text-sm text-yellow-400 hover:underline mt-2"
                            >
                              View product
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => toggleLike(msg._id, msg.liked)}
                      className={`ml-3 ${
                        msg.liked ? "text-red-500" : "text-gold"
                      } hover:text-yellow-300`}
                    >
                      <Heart fill={msg.liked ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {loading && (
          <div className="flex items-center gap-2 text-gray-400 italic">
            StyleHive AI is typing <TypingDots />
          </div>
        )}
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

export default ChatBox;
