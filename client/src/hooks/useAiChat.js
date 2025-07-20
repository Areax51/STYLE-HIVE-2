// src/hooks/useAIChat.js
import { useState, useEffect, useRef, useCallback } from "react";
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
  const [messages, setMessages] = useState([]);
  const [stream, setStream] = useState("");
  const [matched, setMatched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const productsRef = useRef([]);

  // 1️⃣ Optionally load chat history
  useEffect(() => {
    if (!loadHistory) return;
    let active = true;
    getChatHistory()
      .then((res) => {
        if (active) setMessages(res.data.reverse());
      })
      .catch((err) => {
        console.error("History load error:", err);
        if (active) setError("Failed to load chat history");
      });
    return () => {
      active = false;
    };
  }, [loadHistory]);

  // 2️⃣ Optionally load products for live matching
  useEffect(() => {
    if (!liveMatching) {
      productsRef.current = [];
      return;
    }
    fetchProducts()
      .then((res) => {
        productsRef.current = res.data;
      })
      .catch((err) => {
        console.error("Product load error:", err);
      });
  }, [liveMatching]);

  // 3️⃣ Wire up socket events once on mount
  useEffect(() => {
    connectSocket();

    const handleChunk = (chunk) => {
      setStream((prev) => {
        const updated = prev + chunk;
        if (liveMatching) {
          const matches = productsRef.current.filter((p) =>
            updated.toLowerCase().includes(p.name.toLowerCase())
          );
          setMatched(matches.slice(0, 4));
        }
        return updated;
      });
    };

    const handleComplete = (fullReply) => {
      setLoading(false);
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
    };

    const handleError = (err) => {
      console.error("AI Error:", err);
      setError("An error occurred. Please try again.");
      setLoading(false);
      setStream("");
      setMatched([]);
    };

    onAIReplyChunk(handleChunk);
    onAIReplyComplete(handleComplete);
    onAIReplyError(handleError);

    return () => {
      disconnectSocket();
    };
  }, [liveMatching]);

  // 4️⃣ sendMessage helper
  const sendMessage = useCallback(
    (text) => {
      const trimmed = text?.trim();
      if (!trimmed) return;
      setError("");
      setMessages((prev) => [
        ...prev,
        { prompt: trimmed, _id: null, liked: false, tags: [] },
      ]);
      setStream("");
      setLoading(true);
      sendUserMessage(trimmed, token);
    },
    [token]
  );

  // 5️⃣ clearChat helper
  const clearChat = useCallback(() => {
    setMessages([]);
    setStream("");
    setMatched([]);
    setLoading(false);
    setError("");
  }, []);

  return {
    messages,
    stream,
    matched,
    loading,
    error,
    sendMessage,
    clearChat,
  };
}
