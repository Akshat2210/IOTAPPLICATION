const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let currentDirection = '';
let clients = new Set(); // Store connected clients

wss.on('connection', (ws) => {
  // Add the connected client to the set
  clients.add(ws);

  // Send the current direction to the connected client
  ws.send(JSON.stringify({ direction: currentDirection }));

  // Handle messages from the client (Java application)
  ws.on('message', (message) => {
    // Update the current direction when a message is received
    const controlData = JSON.parse(message);
    currentDirection = controlData.direction;

    // Broadcast the updated direction to all connected clients
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ direction: currentDirection }));
      }
    });
  });

  // Handle client disconnection
  ws.on('close', () => {
    clients.delete(ws);
  });
});

app.use(express.static('public'));

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
