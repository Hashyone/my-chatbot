const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//const port = 3001; // Instead of 5000

app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: "Server is working!" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});