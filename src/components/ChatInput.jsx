import { useState } from "react";

export default function ChatInput({ onSend, loading }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        padding: "15px",
        borderTop: "1px solid #333",
      }}
    >
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={2}
        placeholder="Ask me anything about Rashid..."
        style={{
          flex: 1,
          resize: "none",
          padding: "12px",
          borderRadius: "10px",
          background: "#1f1f1f",
          color: "#fff",
          border: "1px solid #444",
        }}
      />

      <button
        onClick={handleSend}
        disabled={loading}
        style={{
          width: "90px",
          border: "none",
          borderRadius: "10px",
          background: "#2563eb",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {loading ? "..." : "Send"}
      </button>
    </div>
  );
}