import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import type { ChatMessage } from "../types/types";

export const Socket = () => {
  const { messages, sendMessage, isConnected } = useSocket(
    "ws://localhost:3001"
  );
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  const handleSend = () => {
    if (input.trim() && username.trim()) {
      const payload = {
        author: username,
        text: input,
      };
      sendMessage(JSON.stringify(payload));
      setInput("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    fetch("http://localhost:3001/messages")
      .then((res) => res.json())
      .then((data) => setHistory(data));
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>WebSocket Chat</h2>
      <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: 8, marginBottom: 12 }}
      >
        <input
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: 6, width: "15%" }}
        />
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
          rows={1}
          style={{
            padding: 6,
            width: "30%",
            resize: "none",
            fontFamily: "inherit",
            fontSize: 14,
            lineHeight: 1.4,
          }}
        />
        <button type="submit" style={{ padding: "6px 12px" }}>
          Send
        </button>
      </form>

      <ul style={{ marginTop: 16 }}>
        {[...history, ...messages].map((msg: ChatMessage, idx) => (
          <li key={idx}>
            [{new Date(msg.timestamp).toLocaleTimeString()}] {msg.author}:{" "}
            {msg.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
