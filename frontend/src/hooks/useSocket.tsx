import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "../types/types";


export function useSocket(url: string) {
  const socketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => setIsConnected(true);

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages((prev) => [...prev, data]);
      } catch {
        console.warn("Invalid WS data:", event.data);
      }
    };

    socket.onerror = (event) => console.error("WebSocket error:", event);
    socket.onclose = () => setIsConnected(false);

    return () => socket.close();
  }, [url]);

  const sendMessage = (msg: string) => {
    const socket = socketRef.current;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(msg);
    }
  };

  return { messages, sendMessage, isConnected };
}
