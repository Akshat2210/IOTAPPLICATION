const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/app') {
    // Replace 'index.html' with your actual file name.
    const filePath = path.join(__dirname, 'index.html');

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else   if (req.method === 'POST' && req.url=='/app/controls') {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    });
    
    req.on('end', () => {
        try {
            const parsedData = JSON.parse(data);

            console.log('Received data:', parsedData.data);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Data received successfully.');
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid data format.');
        }
    });
}  else {
    
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  } 

});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
