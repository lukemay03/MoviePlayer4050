const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require("cors");
const multer = require('multer')
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001; 
let db = new sqlite3.Database('./CinemaApp.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the  SQlite database.');
});
db.configure("busyTimeout", 5000); 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../movie_app/public/pics')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage })
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
app.post('/image', upload.single('file'), function (req, res) {
  const files = req.files;
  res.json(files);
})
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
// Endpoint to insert a new movie
app.post('/movie/insert', (req, res) => {
  console.log(req.body);
  let { moviename, cast, category, director, producer, synopsis, trailerpicture, trailerlink, movierating, current_running } = req.body;

  // Insert the user into the database
  let sql = 'INSERT INTO Movies (movie_title, cast, category, director, producer, synopsis, trailer_picture, trailer_link, movie_rating, Current_running) VALUES (?,?,?,?,?,?,?,?,?,?)'
  db.run(sql, [moviename, cast, category, director,producer,synopsis,trailerpicture,trailerlink,movierating,current_running], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error inserting user');
    } else {
      res.status(201).send('User created successfully');
    }
  });
});

// Endpoint to insert a new user
app.post('/user/insert', (req, res) => {
  console.log(req.body);
  let { role, first_name, last_name , email, password, status} = req.body;

  // Insert the user into the database
  let sql = 'INSERT INTO Users (role, first_name, last_name, email, password, status) VALUES (?,?,?,?,?,?)'
  db.run(sql, [role, first_name, last_name, email,password,status], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error inserting user');
    } else {
      res.status(201).send('User created successfully');
    }
  });
});

//login endpoint 
const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  //check credentials in db 
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.get(sql, [email], (err, user) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (!user || password !== user.password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    //no error, create jwt token
    //implement secretKey??
    const token = jwt.sign({ email: user.email, userId: user.user_id }, 'secretKey', { expiresIn: '1h' });
    
    //send token to the client
    res.status(200).json({ token });
  });
});

//edit profile load info endpoint 
app.get('/user/profile', (req, res) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; //extract the token from the authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'secretKey', (err, user) => {  //verify the token with the secretKey
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    //extract userID from token and query db for user info
    const sql = 'SELECT first_name, last_name, email, status FROM Users WHERE user_id = ?';
    db.get(sql, [user.userId], (err, userData) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      
  //check if userData exists before sending
  if (userData) {
    res.json(userData);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
    });
  });
});

//edit profile update endpoint
app.post('/user/update', (req, res) => {
  const { first_name, last_name, password } = req.body;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    //update user info in db here
    const sql = 'UPDATE users SET first_name = ?, last_name = ?, password = ? WHERE user_id = ?';
    db.run(sql, [first_name, last_name, password, user.userId], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(200).json({ message: 'Profile updated successfully' });
    });
  });
});






