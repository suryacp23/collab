import { WebSocket, WebSocketServer } from "ws";

// Set up the WebSocket server on port 1234
const wss = new WebSocketServer({ port: 1234 });

// Store all connected clients
const clients = new Set();

wss.on("connection", (ws) => {
  console.log("New client connected");
  clients.add(ws);

  // Broadcast any message received from a client to all clients
  ws.on("message", (data) => {
    for (const client of clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    }
  });

  // Remove client from the set on close
  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(ws);
  });

  // Log errors
  ws.on("error", (error) => {
    console.error(`WebSocket error: ${error}`);
  });
});

console.log("WebSocket server is running on ws://localhost:1234");
