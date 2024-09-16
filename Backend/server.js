const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001; // PORT can be set by the environment or default to 3000

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
app.get('/about', (req, res) => {
    res.send('This is the about page');
  });