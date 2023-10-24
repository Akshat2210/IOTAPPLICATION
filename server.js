const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let currentDirection = '';

app.get('/', (req, res) => {
  res.send(`Current Direction: ${currentDirection}`);
});

app.post('/control', (req, res) => {
  // Handle control signals sent from the app
  const controlData = req.body;

  // Update the current direction
  currentDirection = controlData.direction;

  res.json({ status: 'Control signals received and updated.' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
