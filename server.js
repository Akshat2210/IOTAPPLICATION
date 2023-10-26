const http = require('http');
const fetch = require('node-fetch');
const fs = require('fs');

const port = 3000;
const githubRepoURL = 'https://raw.githubusercontent.com/YourGitHubUsername/YourRepoName/main/index.html';

const server = http.createServer(async (req, res) => {
  if (req.url === '/app') {
    try {
      // Fetch the 'index.html' file from your GitHub repository.
      const response = await fetch(githubRepoURL);

      if (response.status === 200) {
        const htmlContent = await response.text();
        // Set the Content-Type header to indicate that it's an HTML file.
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(htmlContent);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
