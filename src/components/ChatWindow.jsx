import { useState } from "react";
import axios from "axios";
import Message from "./Message";
import ChatInput from "./ChatInput";

export default function ChatWindow() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "👋 Hi! I'm Rashid's AI Assistant.\nAsk me anything about my skills or projects.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  async function sendMessage(message) {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: message,
      },
    ]);

    setLoading(true);

    try {
      const res = await axios.post("/api/chat", {
        message,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            res.data?.choices?.[0]?.message?.content ||
            "No response received.",
        },
      ]);
    } catch (err) {
      console.error("Chat Error:", err);

      let errorMessage = "Unknown Server Error";

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Data:", err.response.data);

        errorMessage =
          err.response.data?.error?.message ||
          err.response.data?.error ||
          JSON.stringify(err.response.data);
      } else if (err.request) {
        errorMessage = "Cannot connect to backend.";
      } else {
        errorMessage = err.message;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `❌ ${errorMessage}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          right: 25,
          bottom: 25,
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: "none",
          background: "#2563eb",
          color: "#fff",
          fontSize: 24,
          cursor: "pointer",
          zIndex: 9999,
        }}
      >
        💬
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            right: 25,
            bottom: 100,
            width: 380,
            height: 550,
            background: "#161616",
            borderRadius: 15,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              padding: 15,
              background: "#202020",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            🤖 Rashid AI
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 15,
            }}
          >
            {messages.map((msg, index) => (
              <Message
                key={index}
                role={msg.role}
                text={msg.text}
              />
            ))}
          </div>

          <ChatInput
            onSend={sendMessage}
            loading={loading}
          />
        </div>
      )}
    </>
  );
}