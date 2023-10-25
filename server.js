const http = require('http');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<div id="direction">No direction received</div>');
});

const wss = new WebSocket.Server({ server });

let currentDirection = 'No direction received';

wss.on('connection', (ws) => {
  ws.send(currentDirection);

  ws.on('message', (message) => {
    currentDirection = message;
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(currentDirection);
      }
    });
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
