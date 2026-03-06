const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sync/daily-scores', (req, res) => {
  const { entries } = req.body;

  console.log('Received batch:', entries);

  res.json({ status: 'success' });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
