const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001; // PORT can be set by the environment or default to 3000
let db = new sqlite3.Database('./CinemaApp.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the  SQlite database.');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
app.get('/movie/trailers', (req, res) => {
  db.all('SELECT movie_title,trailer_link, trailer_picture FROM Movies where current_running = \'True\' ', (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(rows);
          //console.log(rows)
      }
  });
});
app.get('/movie/comingsoon', (req, res) => {
  db.all('SELECT movie_title,trailer_link, trailer_picture FROM Movies where current_running = \'False\'', (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(rows);
          //console.log(rows)
      }
  });
});
app.get('/movie/search', (req, res) => {
  let inputString = req.query.string;
  let querystring = 'SELECT movie_title, trailer_picture FROM Movies where movie_title like \'%' + inputString + '%\'';
  db.all(querystring, (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(rows);
      }
  });
});
// Endpoint to insert a new user
app.post('/movie/insert', (req, res) => {
  let { title, cast, category, director, producer, synopsis, trailer_picture, trailer_link, movie_rating, Current_running } = req.body;

  // Insert the user into the database
  let sql = 'INSERT INTO Movies (title, cast, category, director, producer, synopsis, trailer_picture, trailer_link, movie_rating, Current_running) VALUES (?,?,?,?,?,?,?,?,?,?)'
  db.run(sql, [title, cast, category, director,producer,synopsis,trailer_picture,trailer_link,movie_rating,Current_running], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error inserting user');
    } else {
      res.status(201).send('User created successfully');
    }
  });
});
