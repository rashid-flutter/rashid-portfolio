import { useState } from "react";
import { FiSend } from "react-icons/fi";

export default function ChatInput({ onSend, loading }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const text = message.trim();

    if (!text || loading) return;

    onSend(text);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input-container">
      <div className="chat-input-box">
        <textarea
          className="chat-input"
          value={message}
          placeholder="Ask RASHI anything..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />

        <button
          type="button"
          className="send-btn"
          onClick={handleSend}
          disabled={loading || !message.trim()}
        >
          {loading ? (
            <div className="spinner" />
          ) : (
            <FiSend size={20} />
          )}
        </button>
      </div>
    </div>
  );
}
