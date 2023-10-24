const express = require('express');
const app = express();
const port = 3000; // You can change the port number if needed

app.get('/', (req, res) => {
  res.send('Hi Akshat');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
