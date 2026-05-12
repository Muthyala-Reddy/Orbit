import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I am Orbit Assistant. How can I help you?" }
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to chat
    setMessages(prev => [...prev, { from: "user", text: message }]);

    try {
      const response = await axios.post(
        "http://localhost:8085/api/chat",
        { message: message },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      // Add bot response
      setMessages(prev => [
        ...prev,
        { from: "bot", text: response.data }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { from: "bot", text: "Sorry 😕 Unable to connect right now." }
      ]);
    }

    setMessage("");
  };

  return (
    <>
      {/* Chat button */}
      <button
        className="btn btn-primary"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "50%"
        }}
        onClick={() => setOpen(!open)}
      >
        💬
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="card shadow"
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "300px",
            height: "400px",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div className="card-header fw-bold">Orbit Chat Assistant</div>

          <div
            className="card-body"
            style={{ overflowY: "auto", flexGrow: 1 }}
          >
            {messages.map((m, index) => (
              <div
                key={index}
                className={`mb-2 text-${
                  m.from === "user" ? "end" : "start"
                }`}
              >
                <span
                  className={`badge bg-${
                    m.from === "user" ? "primary" : "secondary"
                  }`}
                >
                  {m.text}
                </span>
              </div>
            ))}
          </div>

          <div className="card-footer d-flex">
            <input
              type="text"
              className="form-control me-2"
              value={message}
              placeholder="Type a message..."
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="btn btn-success" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatWidget;