import React, { useState, useRef, useEffect } from "react";

export default function ChatWindow({
  messages = [],
  chatTitle,
  onBack,
  onSendMessage,
  chatAvatar,
}) {
  const [input, setInput] = useState("");
  const [localMessages, setLocalMessages] = useState(messages);
  const scrollAnchorRef = useRef(null);

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behaviou: "smooth" });
  }, [localMessages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      messageId: Date.now().toString(),
      sender: "USER",
      message: input.trim(),
      messageType: "text",
      timestamp: Date.now(),
    };
    onSendMessage(newMsg);
    setInput("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          fontWeight: "bold",
          borderBottom: "1px solid #f0f0f0",
          backgroundColor: "#fff",
        }}
      >
        <button onClick={onBack} style={{ marginRihgt: "12px" }}>
          Back
        </button>
        <img
          src={chatAvatar}
          alt="avatar"
          style={{
            width: "16px",
            height: "16px",
            borderradius: "60%",
            objectFit: "cover",
            marginRight: "4px",
          }}
        />
        <div>{chatTitle}</div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "100%", borderRadius: "5%" }}
        />
      </div>
    </div>
  );
}
