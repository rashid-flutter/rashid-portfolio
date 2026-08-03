import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Lottie from "lottie-react";

import "./chat.css";

import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import Typing from "./Typing";

export default function ChatWindow() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const chatBodyRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "👋 Hi! I'm Rashi, your AI Assistant.\nAsk me anything about my skills, experience or projects.",
    },
  ]);

  const [animationData, setAnimationData] = useState(null);

  const suggestions = [
    "What services do you provide?",
    "How can I contact you?",
    "Tell me about your latest project",
    "Show me your tech stack",
  ];

  useEffect(() => {
    const body = chatBodyRef.current;

    if (!body) return;

    const scrollToBottom = () => {
      body.scrollTo({
        top: body.scrollHeight,
        behavior: "smooth",
      });
    };

    requestAnimationFrame(scrollToBottom);
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading, open]);

  useEffect(() => {
    fetch("/ai.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(() => {});
  }, []);

  async function sendMessage(message) {
    if (!message.trim() || loading) return;

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
            res.data?.choices?.[0]?.message?.content ??
            "No response received.",
        },
      ]);
    } catch (err) {
      let errorMessage = "Unknown server error.";

      if (err.response) {
        errorMessage =
          err.response.data?.error?.message ||
          err.response.data?.error ||
          JSON.stringify(err.response.data);
      } else if (err.request) {
        errorMessage = "Cannot connect to server.";
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
        className="chat-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Open chat"
      >
        {animationData ? (
          <div style={{ width: 36, height: 36, background: "transparent" }}>
            <Lottie
              animationData={animationData}
              loop
              autoplay
              renderer="svg"
              style={{ width: "100%", height: "100%", background: "transparent" }}
              rendererSettings={{ preserveAspectRatio: "xMidYMid meet", clearCanvas: true }}
            />
          </div>
        ) : (
          "🤖"
        )}
      </button>

      {open && (
        <div className="chat-window">
          <ChatHeader
            onClose={() => setOpen(false)}
          />

          <div className="chat-suggestions">
            {suggestions.map((item) => (
              <button
                key={item}
                type="button"
                className="suggestion-chip"
                onClick={() => sendMessage(item)}
                disabled={loading}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="chat-body" ref={chatBodyRef}>

            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                role={msg.role}
                text={msg.text}
              />
            ))}

            {loading && <Typing />}

            <div ref={messagesEndRef} />

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