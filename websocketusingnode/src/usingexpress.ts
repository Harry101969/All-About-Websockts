// import express from "express";
// import WebSocket, { WebSocketServer } from "ws";

// const app = express();
// const PORT = 8080;

// // Set up the WebSocket server
// const server = app.listen(PORT, () => {
//   console.log(new Date() + `Server is listening on port ${PORT}`);
// });

// // Create a WebSocket server
// const wss = new WebSocketServer({ server });

// app.get("/", (req, res) => {
//   console.log(new Date() + " Received request for " + req.url);
//   res.send("hi there!");
// });

// // Handle WebSocket connections
// wss.on("connection", (ws) => {
//   ws.on("error", console.error);

//   ws.on("message", (data, isBinary) => {
//     // Broadcast the received message to all connected clients
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(data, { binary: isBinary });
//       }
//     });
//   });

//   ws.send("Hello! Message From Server");
// });
import express from "express";
import WebSocket, { WebSocketServer } from "ws";
const PORT = 8000;
const app = express();
const server = app.listen(PORT, () => {
  console.log(new Date() + `Server is listening on port ${PORT}`);
});
app.get("/", ({ req, res }: any) => {
  res.send("Hello Tika!");
});

const wss = new WebSocketServer({ server: server });

wss.on("connection", (ws) => {
  ws.on("error", (err) => console.error(err));

  ws.on("message", (data, isBinary) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
  ws.send("Hello From Server!!");
});
