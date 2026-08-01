import ReactMarkdown from "react-markdown";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function ChatMessage({
  role,
  text,
  time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
}) {
  const isUser = role === "user";
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // load Lottie JSON from public folder
    async function load() {
      try {
        const res = await fetch("/ai.json");
        if (!res.ok) return;
        const json = await res.json();
        setAnimationData(json);
      } catch (e) {
        // ignore — fallback will be used
      }
    }

    if (!isUser) load();
  }, [isUser]);

  return (
    <div className={`message ${isUser ? "user" : "assistant"}`}>
      {!isUser && (
        <div className="message-avatar">
          {animationData ? (
            <div className="message-avatar-inner">
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
            <div className="message-avatar-fallback">AI</div>
          )}
        </div>
      )}

      <div className="message-bubble">
        <ReactMarkdown
          components={{
            code({ children }) {
              return (
                <pre
                  style={{
                    background: "#111827",
                    padding: "12px",
                    borderRadius: "10px",
                    overflowX: "auto",
                    marginTop: "10px",
                  }}
                >
                  <code>{children}</code>
                </pre>
              );
            },
          }}
        >
          {text}
        </ReactMarkdown>

        <div className="message-time">{time}</div>
      </div>

      {isUser && (
        <div className="message-user-icon">
          <FaUserCircle size={34} />
        </div>
      )}

      <style>{`
        @keyframes fadeIn{
          from{
            opacity:0;
            transform:translateY(12px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        pre::-webkit-scrollbar{
          height:6px;
        }

        pre::-webkit-scrollbar-thumb{
          background:#555;
          border-radius:6px;
        }

        p{
          margin:0;
        }

        ul{
          padding-left:18px;
        }

        li{
          margin-bottom:6px;
        }
      `}</style>
    </div>
  );
}