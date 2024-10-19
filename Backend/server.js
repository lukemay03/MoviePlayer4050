const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require("cors");
const multer = require('multer')
const app = express();
app.use(cors());
app.use(express.json());

// crypto module
const crypto = require("crypto");

const algorithm = "aes-256-cbc"; 

const initVector = Buffer.from('8c4fcb8d3e8c1a4c8a1b0df5d7f3e5e1', 'hex');
const key = Buffer.from('7d2a3d4f7a6a05f6b51ec5677c3e9db5fb8d42c3770a0a4b9d31a3bc2e0d9531f', 'hex');
function encrypt(text) {

  const cipher = crypto.createCipheriv(algorithm, key, initVector);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
}
function decrypt(text) {
  const decipher = crypto.createDecipheriv(algorithm, key, initVector);
  let decrypted = decipher.update(text, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');

  return decrypted;
}
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
  db.run(sql, [role, first_name, last_name, email,encrypt(password),status], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error inserting user');
    } else {
      res.status(201).send('User created successfully');
    }
  });
});
// 123456, password, secure
//test = 'secure';
//encryptedtest = encrypt(test);
//console.log(encryptedtest);
//decryptedtest = decrypt(encryptedtest);
//console.log(decryptedtest)

//login endpoint 
const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  //check credentials in db 
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.get(sql, [email], (err, user) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    console.log(user);
    if (!user || encrypt(password) !== user.password) {
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
    db.run(sql, [first_name, last_name, encrypt(password), user.userId], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(200).json({ message: 'Profile updated successfully' });
    });
  });
});

// Nodemailer transporter configuration
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lmay.old@gmail.com',
    pass: 'stboeteyemxkudgn',
  },
});

// Email-sending function
function sendConfirmationEmail(toEmail) {
  const mailOptions = {
    from: 'lmay.old@gmail.com',
    to: toEmail,
    subject: 'Registration Confirmation',
    html: `
      <h2>Thank you for Registering!</h2>
      <p>Your registration is confirmed. Welcome to Movie Player Co!</p>
      <p>Best regards,</p>
      <p>Movie Player Co.</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Confirmation email sent:', info.response);
    }
  });
}

// Backend route to trigger the email
app.post('/trigger-order-confirm', (req, res) => {
  const { email } = req.body; // Expecting email from the frontend
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  sendConfirmationEmail(email); // Send the email

  res.status(200).json({ message: 'Confirmation email sent to ' + email + '.' });
});
