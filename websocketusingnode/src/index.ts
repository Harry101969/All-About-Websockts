//In express
//U use express because it provides better routing , middlewares and ecosystem for middlewares
import express from "express";
import WebSocket, { WebSocketServer } from "ws";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(cors());
// Set up the WebSocket server
const server = app.listen(PORT, () => {
  console.log(new Date() + `Server is listening on port ${PORT}`);
});

// Create a WebSocket server
const wss = new WebSocketServer({ server });

app.get("/", (req, res) => {
  console.log(new Date() + " Received request for " + req.url);
  res.send("hi there! From Harsh");
});

// Handle WebSocket connections
let userCount = 0;
wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (data, isBinary) => {
    // Broadcast the received message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
  console.log("Users Connected: ", ++userCount);
  ws.send("Hello! Message From Server");
});
