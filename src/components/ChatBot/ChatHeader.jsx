import { HiOutlineXMark } from "react-icons/hi2";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function ChatHeader({ onClose }) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/ai.json")
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);

  return (
    <div className="chat-header">

    <div className="chat-header-left">

        <div className="chat-avatar" style={{ background: "transparent" }}>
            {animationData ? (
                <Lottie
                    animationData={animationData}
                    loop
                    renderer="svg"
                    style={{ width: "100%", height: "100%", background: "transparent" }}
                    rendererSettings={{ preserveAspectRatio: "xMidYMid meet", clearCanvas: true }}
                />
            ) : (
                <span style={{ color: "#fff", fontWeight: 700 }}>AI</span>
            )}
        </div>

        <div className="chat-info">
            <h3>Rashi AI</h3>

            <p>Portfolio Assistant</p>

            <div className="chat-status">
                Online
            </div>
        </div>

    </div>

    <button
        className="chat-close"
        onClick={onClose}
    >
        ✕
    </button>

</div>
  );
}