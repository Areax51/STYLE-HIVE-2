// src/hooks/useAIChat.js
import { useState, useEffect, useRef } from "react";
import {
  connectSocket,
  disconnectSocket,
  onAIReplyChunk,
  onAIReplyComplete,
  onAIReplyError,
  sendUserMessage,
} from "../utils/socket";
import { fetchProducts, getChatHistory } from "../utils/api";

export function useAIChat({ loadHistory = false, liveMatching = false } = {}) {
  const [messages, setMessages] = useState([]); // { prompt, response, _id?, liked?, tags? }
  const [stream, setStream] = useState(""); // current streaming text
  const [products, setProducts] = useState([]); // full product list
  const [matched, setMatched] = useState([]); // top-4 matches from stream
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const latestMessages = useRef(messages);
  latestMessages.current = messages;

  // 1️⃣ Optionally load chat history
  useEffect(() => {
    if (!loadHistory) return;
    getChatHistory()
      .then((res) => setMessages(res.data.reverse()))
      .catch((err) => console.error("History load error:", err));
  }, [loadHistory]);

  // 2️⃣ Optionally load products for live matching
  useEffect(() => {
    if (!liveMatching) return;
    fetchProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Product load error:", err));
  }, [liveMatching]);

  // 3️⃣ Wire up socket events once
  useEffect(() => {
    connectSocket();

    onAIReplyChunk((chunk) => {
      setStream((prev) => {
        const updated = prev + chunk;
        // update matches if requested
        if (liveMatching) {
          const matches = products.filter((p) =>
            updated.toLowerCase().includes(p.name.toLowerCase())
          );
          setMatched(matches.slice(0, 4));
        }
        return updated;
      });
    });

    onAIReplyComplete((fullReply) => {
      setLoading(false);
      // replace last user prompt with full obj
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        const completed = {
          ...last,
          response: fullReply,
          liked: last.liked ?? false,
          tags: last.tags ?? [],
        };
        return [...prev.slice(0, -1), completed];
      });
      setStream("");
      setMatched([]);
    });

    onAIReplyError((err) => {
      console.error("AI Error:", err);
      setLoading(false);
      setStream("");
      setMatched([]);
    });

    return () => {
      disconnectSocket();
    };
  }, [liveMatching, products]);

  // 4️⃣ sendMessage helper
  const sendMessage = (text) => {
    if (!text?.trim()) return;
    // add a placeholder message
    setMessages((prev) => [...prev, { prompt: text }]);
    setStream("");
    setLoading(true);
    sendUserMessage(text, token);
  };

  return {
    messages,
    stream,
    matched,
    loading,
    sendMessage,
  };
}
