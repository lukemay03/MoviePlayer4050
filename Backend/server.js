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
// Endpoint to get a movie's details
app.get('/movie/details', (req, res) => {
  let inputString = req.query.string;
  let querystring = 'SELECT movie_title, category, director, producer, movie_rating, synopsis, \"cast\" FROM Movies where movie_title like \'%' + inputString + '%\'';
  db.all(querystring, (err, rows) => {
    if (err) {
      console.log("query string: ", querystring);
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

  res.status(200).json({ message: 'Email sent to ' + email + '.' });
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