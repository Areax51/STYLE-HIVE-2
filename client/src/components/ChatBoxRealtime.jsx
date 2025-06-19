import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000"); // Replace with your live server URL for deployment

const ChatBoxRealtime = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentStream, setCurrentStream] = useState("");
  const [products, setProducts] = useState([]);
  const [matchedProducts, setMatchedProducts] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch products once
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Product fetch error:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    socket.on("aiReplyChunk", (chunk) => {
      setCurrentStream((prev) => {
        const updated = prev + chunk;
        matchProducts(updated);
        return updated;
      });
    });

    socket.on("aiReplyComplete", async (fullReply) => {
      setMessages((prev) => [...prev, { prompt: input, response: fullReply }]);
      setCurrentStream("");
      setInput("");
      setMatchedProducts([]);

      // Save to DB
      try {
        await axios.post(
          "/api/chat",
          { message: input, response: fullReply },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (err) {
        console.error("Chat save error:", err);
      }
    });

    socket.on("aiReplyError", (err) => {
      console.error("AI Error:", err);
      setCurrentStream("");
    });

    return () => {
      socket.off("aiReplyChunk");
      socket.off("aiReplyComplete");
      socket.off("aiReplyError");
    };
  }, [input]);

  const matchProducts = (text) => {
    const matches = products.filter((product) =>
      text.toLowerCase().includes(product.name.toLowerCase())
    );
    setMatchedProducts(matches.slice(0, 4));
  };

  const handleSend = () => {
    if (!input.trim()) return;
    socket.emit("userMessage", {
      message: input,
      token: localStorage.getItem("token"),
    });
    setMessages((prev) => [...prev, { prompt: input, response: null }]);
    setCurrentStream("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentStream]);

  return (
    <div className="h-[90vh] bg-black text-white p-6 flex flex-col max-w-5xl mx-auto">
      <div className="flex-1 overflow-y-auto space-y-6 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="space-y-2">
            <div>
              <p className="text-gold font-bold">You:</p>
              <p>{msg.prompt}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg border border-gold">
              <p className="text-gold font-bold">StyleHive AI:</p>
              <p>
                {msg.response ?? (i === messages.length - 1 && currentStream)}
              </p>
            </div>
          </div>
        ))}

        {currentStream && (
          <div>
            <div className="text-sm italic text-yellow-300">
              StyleHive AI is typing...
            </div>
            {matchedProducts.length > 0 && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {matchedProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white/10 border border-gold p-4 rounded-lg"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover mb-2 rounded"
                    />
                    <p className="font-semibold text-gold">{product.name}</p>
                    <p className="text-sm text-gray-300">${product.price}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
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
