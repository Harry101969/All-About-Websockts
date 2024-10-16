import { useEffect, useState } from "react";

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [latestMsg, setLatestMsg] = useState("");
  const [input, setInput] = useState("");
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("Connected");
      setSocket(socket);
    };
    socket.onmessage = (message) => {
      console.log("Receiived message: ", message.data);
      setMessages((m) => [...m, message.data]);
      setLatestMsg(message.data);
    };
    setSocket(socket);
  }, []);

  if (!socket) {
    return <div>Connecting to socket server...</div>;
  }
  return (
    <div>
      <div className="sendMsg">
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button
          onClick={() => {
            socket.send(input);
          }}
        >
          Send
        </button>
      </div>

      <div>
        <h2>Messages</h2>
        {messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
      <div>
        <h2>Latest Messages</h2>
        {latestMsg}
      </div>
    </div>
  );
}

export default App;
