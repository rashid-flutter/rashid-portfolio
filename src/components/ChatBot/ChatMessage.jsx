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
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "18px",
        animation: "fadeIn .35s ease",
      }}
    >
      {!isUser && (
        <div
          style={{
            marginRight: "10px",
            marginTop: "4px",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#7C3AED,#2563EB)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {animationData ? (
            <div style={{ width: 34, height: 34, background: "transparent" }}>
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
            <div style={{ color: "#fff", fontWeight: 700 }}>AI</div>
          )}
        </div>
      )}

      <div
        style={{
          maxWidth: "78%",
          background: isUser
            ? "linear-gradient(135deg,#2563EB,#7C3AED)"
            : "rgba(255,255,255,.06)",
          color: "#fff",
          borderRadius: isUser
            ? "20px 20px 6px 20px"
            : "20px 20px 20px 6px",
          padding: "14px 16px",
          border: isUser
            ? "none"
            : "1px solid rgba(255,255,255,.08)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 25px rgba(0,0,0,.25)",
          overflowWrap: "break-word",
          lineHeight: 1.7,
          fontSize: "15px",
        }}
      >
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

        <div
          style={{
            marginTop: "8px",
            fontSize: "11px",
            opacity: ".6",
            textAlign: "right",
          }}
        >
          {time}
        </div>
      </div>

      {isUser && (
        <div
          style={{
            marginLeft: "10px",
            marginTop: "4px",
            color: "#8B5CF6",
            flexShrink: 0,
          }}
        >
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

        @media(max-width:768px){

          div[style*="max-width: 78%"]{
            max-width:85%;
          }

        }
      `}</style>
    </div>
  );
}