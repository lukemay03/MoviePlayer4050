const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001; // PORT can be set by the environment or default to 3000
let db = new sqlite3.Database('./CinemaApp.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the  SQlite database.');
});

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
app.get('/about', (req, res) => {
    res.send('This is the about page');
  });
app.get('/movie/trailers', (req, res) => {
  db.all('SELECT movie_title,trailer_link FROM Movies', (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(rows);
      }
  });
});