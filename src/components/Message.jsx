export default function Message({ role, text }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: role === "user" ? "flex-end" : "flex-start",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          maxWidth: "75%",
          padding: "12px 16px",
          borderRadius: "12px",
          background: role === "user" ? "#2563eb" : "#2b2b2b",
          color: "#fff",
          whiteSpace: "pre-wrap",
          lineHeight: 1.5,
        }}
      >
        {text}
      </div>
    </div>
  );
}