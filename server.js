// Minimal Express server that serves the static `coolstuff.html` and listens on $PORT
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'coolstuff.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
