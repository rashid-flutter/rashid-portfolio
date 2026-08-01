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
    <div
      style={{
        padding: "14px 16px 18px",
        borderTop: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(15,12,40,0.92)",
        backdropFilter: "blur(22px)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "12px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "22px",
          padding: "12px 14px",
          border: "1px solid rgba(255,255,255,.12)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,.08), 0 18px 40px rgba(15,12,40,.22)",
        }}
      >
        <textarea
          value={message}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          style={{
            flex: 1,
            minHeight: "48px",
            resize: "none",
            border: "none",
            outline: "none",
            background: "transparent",
            color: "#eef2ff",
            fontSize: "15px",
            lineHeight: "22px",
            maxHeight: "140px",
            overflowY: "auto",
            padding: "8px 0",
          }}
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={loading || !message.trim()}
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            border: "none",
            cursor: loading || !message.trim() ? "not-allowed" : "pointer",
            background:
              loading || !message.trim()
                ? "rgba(255,255,255,0.12)"
                : "linear-gradient(135deg,rgba(124,58,237,1),rgba(59,130,246,1))",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform .2s ease, box-shadow .2s ease, opacity .2s ease",
            boxShadow:
              loading || !message.trim()
                ? "none"
                : "0 16px 34px rgba(99,102,241,.24)",
          }}
        >
          {loading ? (
            <div
              style={{
                width: "18px",
                height: "18px",
                border: "2px solid rgba(255,255,255,.35)",
                borderTop: "2px solid #fff",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
          ) : (
            <FiSend size={20} />
          )}
        </button>
      </div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        textarea::-webkit-scrollbar {
          width: 6px;
        }

        textarea::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,.18);
          border-radius: 999px;
        }

        button[type="button"]:not([disabled]):hover {
          transform: translateY(-2px);
        }

        @media (max-width:768px) {
          textarea {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}