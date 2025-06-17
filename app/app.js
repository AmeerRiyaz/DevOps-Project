const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware (optional)
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Main route
app.get('/', (req, res) => {
  res.send('Hello from Express App! 🚀');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
