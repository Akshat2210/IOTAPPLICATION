const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/control', (req, res) => {
  // Handle control signals sent from the Android app
  const controlData = req.body; // Assuming the app sends JSON data
  // Send control signals to the ESP32
  // You may use a library like 'axios' to send requests to the ESP32
  // You can also send a response back to the app for confirmation

  res.json({ status: 'Control signals sent to ESP32' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
