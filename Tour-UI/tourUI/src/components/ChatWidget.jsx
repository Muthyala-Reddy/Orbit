import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import { destinationPackages } from "../data/packages";

 
function ChatWidget({ open, onClose }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I am Orbit Assistant. How can I help you?" }
  ]);
 
  const chatEndRef = useRef(null);
  const navigate=useNavigate();


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
 
  if (!open) return null;
 


const handleBotBooking = (data) => {
  const { destination, duration } = data;


  const selectedDestination = destinationPackages.find(
    d => d.name.toLowerCase() === destination
  );
  if (!selectedDestination) return;


  const token = localStorage.getItem("token");
  if (!token) {
    localStorage.setItem("pendingBooking", JSON.stringify({
      packageId: selectedDestination.id,
      autoOpen: duration
    }));

    setMessages(prev => [...prev, { from: "bot", text: "🔐 Please sign in to continue booking. Redirecting…" }]);

    setTimeout(() => navigate("/signin"), 800);
    return;
  }


  navigate(`/package/${selectedDestination.id}`, {
    state: { autoOpen: duration }
  });
};



  
const sendMessage = async () => {
  if (!message.trim()) return;

  // Add user message
  setMessages(prev => [...prev, { from: "user", text: message }]);
  setMessage("");

  // Add typing indicator
  setMessages(prev => [...prev, { from: "bot", text: "Typing..." }]);

  const response = await axios.post(
  "http://localhost:8000/chat",
  { message },
  { headers: { "Content-Type": "application/json" } }
);


  setMessages(prev => {
    const updated = [...prev];
    updated[updated.length - 1] = {
      from: "bot",
      text: response.data?.reply ?? "No reply received"
    };
    return updated;
  });


  if (response.data?.action === "BOOK") {
    setTimeout(() => {
      handleBotBooking(response.data);
    }, 800); 
  }
  };

 
  return (
    <div
      style={{
        position: "fixed",
        top: "70px",
        right: "20px",
        width: "330px",
        height: "450px",
        background: "#fff",
        borderRadius: "14px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: 1050
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #0d6efd, #6610f2)",
          color: "white",
          padding: "12px 14px",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        🤖 Orbit Assistant
        <span style={{ cursor: "pointer" }} onClick={onClose}>
          ✕
        </span>
      </div>
 
      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "12px",
          overflowY: "auto",
          background: "#f4f6f9"
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: m.from === "user" ? "flex-end" : "flex-start",
              marginBottom: "10px"
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "10px 14px",
                borderRadius: "14px",
                fontSize: "14px",
                background: m.from === "user" ? "#0d6efd" : "#fff",
                color: m.from === "user" ? "white" : "#333"
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
 
      {/* Input */}
      <div style={{ display: "flex", padding: "10px", borderTop: "1px solid #ddd" }}>
        <input
          type="text"
          value={message}
          placeholder="Type a message..."
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          style={{
            flex: 1,
            borderRadius: "20px",
            border: "1px solid #ccc",
            padding: "8px 12px"
          }}
        />
 
        <button
          onClick={sendMessage}
          style={{
            marginLeft: "8px",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            border: "none",
            background: "#0d6efd",
            color: "white"
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
}
 
export default ChatWidget;