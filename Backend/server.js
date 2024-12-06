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
  //console.log(text);
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
  db.all('SELECT * FROM Movies where current_running = \'True\' ', (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(rows);
          //console.log(rows)
      }
  });
});
app.get('/movie/comingsoon', (req, res) => {
  db.all('SELECT * FROM Movies where current_running = \'False\'', (err, rows) => {
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
// Endpoint to get a movie's details
app.get('/movie/details', (req, res) => {
  let inputString = req.query.string;
  let querystring = 'SELECT movie_title, category, director, producer, movie_rating, synopsis, \"cast\" FROM Movies where movie_title like \'%' + inputString + '%\'';
  db.all(querystring, (err, rows) => {
    if (err) {
      // console.log("query string: ", querystring);
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows); // Return a single movie object
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

// Endpoint to see if email already exists
app.get('/user/check-email', (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({message: 'Email is required'});
  }

  const checkEmailSQL = 'SELECT * FROM Users WHERE email = ?';
  db.get(checkEmailSQL, [email], (err, row) => {
    if (err) {
      console.error("Error checking email: ", err.message);
      return res.status(500).json({message: ' Error checking email'});
    }
    if (row) {
      return res.status(200).json({exists: true, message: 'Email already registered'});
    }
    res.status(200).json({exists: false, message: 'Email is available'});
  });
});

// Endpoint to insert a new user
app.post('/user/insert', (req, res) => {
  console.log(req.body);
  let { role, first_name, last_name , email, password, status, registeredforpromo, address} = req.body;

  // Insert the user into the database
  console.log(registeredforpromo);
  let sql = 'INSERT INTO Users (role, first_name, last_name, email, password, status, registeredforpromo, address) VALUES (?,?,?,?,?,?,?,?)'
  db.run(sql, [role, first_name, last_name, email,encrypt(password),status, registeredforpromo, address], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error inserting user');
    } else {
      res.status(201).send('User created successfully');
    }
  });
});
// admin: fake@uga.edu, 123456, 
// user: bobsmith@gmail.com, password 
// user: johnmason@gmail.com, secure
//test = 'Kevin';
//encryptedtest = encrypt(test);
//console.log(encryptedtest);
//decryptedtest = decrypt(encryptedtest);
//console.log(decrypt('5c06f6cce196bab68474cd294956e6c8'));
//console.log(decryptedtest)

//login endpoint 
const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  //check credentials in db 
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.get(sql, [email], (err, user) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    //console.log(decrypt(user.password));
    //console.log(user.password);
    //console.log(encrypt(password));
    if (!user || encrypt(password) !== user.password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    //no error, create jwt token
    //implement secretKey??
    const token = jwt.sign({ email: user.email, userId: user.user_id, role: user.role}, 'secretKey', { expiresIn: '1h' });
    
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
    const sql = 'SELECT first_name, last_name, email, status, registeredforpromo, user_id, role, address FROM Users WHERE user_id = ?';
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
  const { first_name, last_name, password, registeredforpromo, address} = req.body;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    console.log(password);
    if (password) {
    //update user info in db here
    const sql = 'UPDATE users SET first_name = ?, last_name = ?, password = ?,  registeredforpromo = ?, address = ? WHERE user_id = ?';
    db.run(sql, [first_name, last_name, encrypt(password), registeredforpromo, address, user.userId], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(200).json({ message: 'Profile updated successfully' });
    });
  } else {
    const sql = 'UPDATE users SET first_name = ?, last_name = ?, registeredforpromo = ?, address = ? WHERE user_id = ?';
    db.run(sql, [first_name, last_name, registeredforpromo, address, user.userId], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(200).json({ message: 'Profile updated successfully' });
    });
  }
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
function sendEmail(toEmail, htmlMessage, subjectLine) {
  const mailOptions = {
    from: 'lmay.old@gmail.com',
    to: toEmail,
    subject: subjectLine,
    html: htmlMessage,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Backend route to trigger the email
app.post('/trigger-order-confirm', (req, res) => {
  const { email, htmlMessage, subject } = req.body; // Expecting email from the frontend
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }
  if (!htmlMessage) {
    return res.status(400).json({ message: 'Message Body is required.' });
  }
  if (!subject) {
    return res.status(400).json({ message: 'Subject Line is required.' });
  }

  sendEmail(email, htmlMessage, subject); // Send the email

  res.status(200).json({ message: 'Order Confirmed! Confirmation email and details sent to: ' + email + '.' });
});

app.post('/generate-token', (req, res) => {
  const {email} = req.body;

  //check credentials in db
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.get(sql, [email], (err, user) => {
    //no error, create jwt token
    //implement secretKey??
    const token = jwt.sign({email: user.email, userId: user.user_id, role: user.role}, 'secretKey', {expiresIn: '1h'});

    //send token to the client
    res.status(200).json({token});
  });
});
app.post('/paymentcard/insert', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; //extract the token from the authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'secretKey', (err, user) => {  //verify the token with the secretKey
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    // Check how many cards the user has
    const countSql = 'SELECT COUNT(*) AS cardCount FROM PaymentCard WHERE user_id = ?';
    db.get(countSql, [user.userId], (err, row) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      if (row.cardCount >= 4) {
        return res.status(400).json({ message: 'You can only have a maximum of 4 payment cards.' });
      }
  console.log(req.body);
  let { cardnumber, expiration_date, cvv, user_id, name} = req.body;

  // Insert the user into the database
  let sql = 'INSERT INTO PaymentCard(cardnumber, expiration_date, cvv, user_id, name) VALUES (?,?,?,?, ?)'
  db.run(sql, [encrypt(cardnumber), encrypt(expiration_date), encrypt(cvv), user_id, encrypt(name)], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error inserting user');
    } else {
      res.status(201).send('User created successfully');
    }
  });
  });
  });
});
app.delete('/paymentcard/delete/:id', (req, res) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; //extract the token from the authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'secretKey', (err, user) => {  //verify the token with the secretKey
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    const cardId = req.params.id; // Get the payment card ID from the request parameters
    const sql = 'DELETE FROM PaymentCard WHERE payment_card_id = ? AND user_id = ?'; // Ensure the card belongs to the user
    db.run(sql, [cardId, user.userId], function(err) {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Payment card not found or does not belong to user' });
    }

    res.json({ message: 'Payment card deleted successfully' });
    });
  });
});
app.get('/paymentcard/get', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'secretKey', (err, user) => { // Verify the token with the secretKey
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    const sql = 'SELECT * FROM PaymentCard WHERE user_id = ?'; // Ensure the card belongs to the user

    db.all(sql, [user.userId], (err, paymentCard) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      if (!paymentCard) {
        return res.status(404).json({ message: 'Payment card not found or does not belong to user' });
      }
      console.log(paymentCard);
      const decryptedCards = paymentCard.map(card => {
        return {
          ...card,
          cardnumber: decrypt(card.cardnumber),
          expiration_date: decrypt(card.expiration_date),
          cvv: decrypt(card.cvv),
          name: decrypt(card.name)
        };
      });
      res.json(decryptedCards); // Return the found payment card
    });
  });
});
//edit profile update endpoint
app.put('/paymentcard/edit', (req, res) => {
  const { cardnumber, expiration_date, name, cvv, user_id, payment_card_id } = req.body;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(req.body);
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    //update user info in db here
    const sql = 'UPDATE PaymentCard SET cardnumber = ?, expiration_date = ?, cvv = ?, name = ? WHERE user_id = ? and payment_card_id = ?';
    db.run(sql, [encrypt(cardnumber), encrypt(expiration_date), encrypt(cvv), encrypt(name), user.userId, payment_card_id], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(200).json({ message: 'Profile updated successfully' });
    });
  });
});

//password reset endpoint
app.post('/user/reset-password', (req, res) => {
  const { password } = req.body;  
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    //update only the password in the database
    const sql = 'UPDATE users SET password = ? WHERE user_id = ?';
    db.run(sql, [encrypt(password), user.userId], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(200).json({ message: 'Password updated successfully' });
    });
  });
});
app.get('/promotion/get/:id', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the authorization header
  const movie_id = req.params.id;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'secretKey', (err, user) => { // Verify the token with the secretKey
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    const sql = 'SELECT Promo.*, Movies.movie_title FROM Promo JOIN Movies ON Promo.movie_id = Movies.movie_id WHERE Promo.movie_id = ?';

    db.all(sql, [movie_id], (err, promoCards) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      if (promoCards.length === 0) {
        return res.status(404).json({ message: 'Promotion card not found' });
      }

      console.log(promoCards); // Log the retrieved promotion cards
      return res.status(200).json(promoCards); // Send the promotion cards back to the client
    });
  });
});
app.post('/promo/insert', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; //extract the token from the authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'secretKey', (err, user) => {  //verify the token with the secretKey
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  let { description, date, movie_id, code} = req.body;

  // Insert the user into the database
  let sql = 'INSERT INTO Promo(description, date, movie_id, code, mailed) VALUES (?,?,?, ?, ?)'
  db.run(sql, [description, date, movie_id, code, 'False'], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error inserting user');
    } else {
      res.status(201).send('Promo created successfully');
    }
  });
  });
  });
  app.delete('/promo/delete/:id', (req, res) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //extract the token from the authorization header
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, 'secretKey', (err, user) => {  //verify the token with the secretKey
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      const promoId = req.params.id; // Get the payment card ID from the request parameters
      const sql = 'DELETE FROM Promo WHERE Promo_id = ?'; // Ensure the card belongs to the user
      db.run(sql, [promoId], function(err) {
        if (err) {
          return res.status(500).json({ message: 'Database error' });
        }
        
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Promo card not found' });
      }
  
      res.json({ message: 'Payment card deleted successfully' });
      });
    });
  });
  app.put('/promo/edit', (req, res) => {
    const { date, description, movie_id, Promo_id, code, mailed} = req.body;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(req.body);
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, 'secretKey', (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      //update user info in db here
      const sql = 'UPDATE Promo SET description = ?, date = ?, code = ?, mailed = ? WHERE Promo_id = ?';
      db.run(sql, [description, date, code, mailed, Promo_id], (err) => {
        if (err) {
          return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json({ message: 'Promo updated successfully' });
      });
    });
  });

  app.get('/users/promo', (req, res) => {
    db.all('SELECT email FROM Users where registeredforpromo = 1 OR registeredforpromo = \'True\'', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
            //console.log(rows)
        }
    });
  });

app.get('/auditoriums/get', (req, res) => {
  const sql = 'SELECT * FROM AUDITORIUM'; // SQL query to fetch all auditoriums

  db.all(sql, (err, rows) => {
    if (err) {
      console.error('Error fetching auditoriums: ', err);
      return res.status(500).json({ error: err.message });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No auditoriums found' });
    }
    // console.log('auditoriums: ', rows);  // Optionally log the fetched rows
    return res.json(rows);  // Send the rows as a JSON response
  });
});

app.post('/MovieShow/post', (req,res) => {
  // console.log(req.body);
  let { aud_id, movie_id, showtimes_id, noofseats } = req.body;

  // Insert the MovieShow (showtime) into the database
  let sql = 'INSERT INTO MovieShow (aud_id, movie_id, showtimes_id, noofseats) VALUES (?,?,?,?)'
  db.run(sql, [aud_id, movie_id, showtimes_id, noofseats], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error creating showtime');
    } else {
      res.status(201).send('Showtime Created Successfully!');
    }
  });
});

app.post('/MovieShow/check', (req, res) => {
  // SQL query to find any movie shows with the same auditorium and a start time within 1 hour
  let { showtimes_id, aud_id } = req.body;

  let sql = `
    SELECT * FROM MovieShow
    WHERE aud_id = ?
      AND ABS(STRFTIME('%s', showtimes_id) - STRFTIME('%s', ?)) <= 3600
  `

  // Execute the query with the provided auditorium ID and showstarttime
  db.all(sql, [aud_id, showtimes_id], (err, rows) => {
    if (err) {
      console.error('Error checking for overlapping showtime:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    // If any rows are returned, it means there is a conflict
    if (rows.length > 0) {
      return res.json({ exists: true });
    }

    // No overlapping showtimes found
    return res.json({ exists: false });
  });
});

//showtimes check
app.post('/showtimes/check', (req, res) => {
  const { timestamp } = req.body;
  const query = `SELECT showtimes_id FROM showtimes WHERE TimeStamp = ?`;

  db.get(query, [timestamp], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ exists: !!row, showtimes_id: row ? row.showtimes_id : null });
  });
});

//add a showtime
app.post('/showtimes/add', (req, res) => {
  const { timestamp } = req.body;
  const query = `INSERT INTO showtimes (TimeStamp) VALUES (?)`;

  db.run(query, [timestamp], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ showtimes_id: this.lastID });
  });
});



//endpoint to get showtimes for a specific movie
app.get('/api/movies/:movieName/showtimes', (req, res) => {
  const { movieName } = req.params;
  console.log(`Received movieName: ${movieName}`);

  //query to fetch movie_id from movieName
  const movieIdQuery = `SELECT movie_id FROM Movies WHERE LOWER(movie_title) = LOWER(?)`;
  db.get(movieIdQuery, [movieName], (err, movie) => {
  if (err || !movie) {
    console.error('Error fetching movie ID:', err || 'Movie not found');
    return res.status(404).json({ error: 'Movie not found' });
  }

  const movieId = movie.movie_id;

    //fetch showtimes for the resolved movie_id
    const query = `
      SELECT 
        s.TimeStamp AS startTime, 
        a.audname AS theaterName, 
        ms.noofseats AS availableSeats
      FROM MovieShow ms
      JOIN showtimes s ON ms.showtimes_id = s.showtimes_id
      JOIN Auditorium a ON ms.aud_id = a.aud_id
      WHERE ms.movie_id = ?;
    `;

    db.all(query, [movieId], (err, rows) => {
      if (err) {
        console.error('Error fetching showtimes:', err);
        return res.status(500).json({ error: 'Failed to fetch showtimes' });
      }

      console.log('Fetched Showtimes:', rows);

      const showtimes = rows.map(row => ({
        startTime: row.startTime,
        theaterName: row.theaterName,
        availableSeats: row.availableSeats
      }));

      res.json({ showtimes });
    });
  });
});

app.post('/activate-account', (req,res) => {
  let { email } = req.body;
  if (!email) {
    return res.status(400).send('Email is required');
  }
  // activate account given email
  let sql = 'UPDATE Users SET status = \'Active\' where email=?';
  db.run(sql, [email], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error activating user');
    } else {
      res.status(201).send('User Activated Successfully!');
    }
  });
});
app.post('/promocode/check', (req, res) => {
  const { movie_title, promoCode } = req.body;
  // Check if promoCode is provided
  if (!promoCode) {
    return res.status(400).json({ error: 'Promo code is required' });
  }

  // SQL query to check for the promo code in the database
  const query = `
  SELECT p.* FROM Promo p INNER JOIN Movies m ON p.movie_id = m.movie_id WHERE m.movie_title = ? AND p.code = ?;`;
  // Query the database
  db.get(query, [movie_title, promoCode], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    // If the promo code does not exist
    if (!row) {
      return res.status(404).json({ error: 'Invalid promo code' });
    }
    return res.json(row);
  });
});
app.post('/insert-order', (req, res) => {
  const { promoID, email, name, selectedShowtime, selectedSeats, adultCount, kidCount, auditorium, total } = req.body;

  // Ensure required data is present
  if (!email || !selectedShowtime || !selectedSeats || selectedSeats.length === 0 || total === undefined) {
    return res.status(400).json({ message: 'Missing required data' });
  }

  // Fetch user_id based on email
  db.get('SELECT user_id FROM Users WHERE email = ?', [email], (err, userRow) => {
    if (err) {
      return res.status(500).json({ message: 'Database error fetching user data' });
    }

    if (!userRow) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userId = userRow.user_id;
  // Fetch user_id based on email
  db.get('SELECT aud_id FROM Auditorium WHERE audname = ?', [auditorium], (err, userRow) => {
    if (err) {
      return res.status(500).json({ message: 'Database error fetching user data' });
    }

    if (!userRow) {
      return res.status(404).json({ message: 'User not found' });
    }

    const audId = userRow.aud_id;

    // Fetch showtime_id based on selectedShowtime
    db.get('SELECT showtimes_id FROM showtimes WHERE TimeStamp = ?', [selectedShowtime], (err, showtimeRow) => {
      if (err) {
        return res.status(500).json({ message: 'Database error fetching showtime data' });
      }

      if (!showtimeRow) {
        return res.status(404).json({ message: 'Showtime not found' });
      }

      const showtimeId = showtimeRow.showtimes_id;

      const paymentCardId = 100;

      // Insert data into the Booking table
      const insertBookingQuery = `
        INSERT INTO Booking (user_id, showtime_id, paymentcard_id, nooftickets, totalprice, Promo_id)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const noOfTickets = adultCount + kidCount;
      db.run(insertBookingQuery, [userId, showtimeId, paymentCardId, noOfTickets, total, promoID || null], function (err) {
        if (err) {
          return res.status(500).json({ message: 'Error inserting booking data' });
        }

        const bookingId = this.lastID;

        // Fetch seat IDs based on the descriptions of selected seats
        const seatDescriptions = selectedSeats;
        const seatQueries = seatDescriptions.map((description) => {
          return new Promise((resolve, reject) => {
            db.get('SELECT seatid FROM Seat WHERE description = ? AND aud_id = ?', [description, audId], (err, seatRow) => {
              if (err) {
                reject(err);
              } else if (!seatRow) {
                reject(`Seat ${description} not found`);
              } else {
                resolve(seatRow.seatid);
              }
            });
          });
        });

        // Once all seat IDs are fetched, insert data into the Tickets table
        Promise.all(seatQueries)
          .then((seatIds) => {
            const insertTicketQuery = `
              INSERT INTO Tickets (seat_id, booking_id, tickettype_id)
              VALUES (?, ?, ?)
            `;
            let adult = adultCount;
            let kid = kidCount;
            let tickettype_id = 3;
            seatIds.forEach((seatId) => {
            if (adult > 0) {
              tickettype_id = 3;  // Adult ticket type ID
              adult--;
            }
            else if (kid > 0) {
              tickettype_id = 1;  // Kid ticket type ID
              kid--;  // Decrease kid ticket count
            } 
            else {
              tickettype_id = 2;  // Default ticket type ID
            }

              db.run(insertTicketQuery, [seatId, bookingId, tickettype_id], function (err) {
                if (err) {
                  console.error('Error inserting ticket:', err.message);
                }
              });
            });

            // Return a success message
            res.status(200).json({ message: 'Order successfully inserted', bookingId });
          })
          .catch((err) => {
            console.error('Error fetching seat IDs:', err);
            res.status(500).json({ message: 'Error processing seat IDs' });
          });
      });
    });
  });
});
});