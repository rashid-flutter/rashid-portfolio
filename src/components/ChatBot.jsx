import { useState } from "react";
import axios from "axios";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  async function send() {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage },
    ]);

    setMessage("");

    try {
      const res = await axios.post("/api/chat", {
        message: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: res.data.choices[0].message.content,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something went wrong.",
        },
      ]);
    }
  }

  return (
    <div>
      <h2>Portfolio AI</h2>

      <div>
        {messages.map((msg, i) => (
          <p key={i}>
            <strong>{msg.role}:</strong> {msg.text}
          </p>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me about Rashid..."
      />

      <button onClick={send}>Send</button>
    </div>
  );
}