const express = require('express');
// Additional package for logging of HTTP requests/responses
const morgan = require('morgan');
const app = express();
const port = 3000;
const path = require('path');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));

app.use(morgan('common'));
app.use(express.static('public_html'));

let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('myDB');

const { createHash } = require('crypto');

function hash(input) {
  return createHash('sha256').update(input).digest('base64');
}

db.serialize(function () {
  db.run("CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, fname TEXT, sname TEXT, mobile TEXT, birthday DATE, address TEXT, city TEXT, state TEXT, pcode INT)");

  db.run("DELETE FROM Users");

});

app.post('/signup/submit', (req, res, next) => {
  // Ensure the body is not undefined
  let message = '';
  if (!req.body) {
    return res.status(400).send({ error: 'Invalid request, no body provided' });
  }
  // Extract email from the body safely
  const { inemail, inpassword, fname, sname, mobile, birthday, address, city, state, pcode } = req.body;

  // Check if inpassword is defined
  if (!inpassword) {
    return res.status(400).send({ error: 'Password is required' });
  }

  // Note: Passwords should be hashed and compared using a secure method in a real application
  let email = hash(inemail);
  let password = hash(inpassword);

  const query = `INSERT INTO Users (email, password, fname, sname, mobile, birthday, address, city, state, pcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(query, [email, password, fname, sname, mobile, birthday, address, city, state, pcode], function (err) {
    if (err) {
      return next(err);
    }
    message += 'Thank you ' + fname + ' for your consideration! We will reach back to you soon!'
    res.render('user', { title: 'THANK YOU FOR SIGNING UP TO BECOME OUR MEMBER', message: message });
  });
  //res.status(200).redirect('/');
});


app.get('/signup/list', (req, res, next) => {

  db.all('SELECT * FROM Users', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.render('user', { title: 'Database Error', rows: [] });
    } else {
      res.render('user', { title: 'Contact List', rows: rows });
    }
  });
});

app.post('/logingin', (req, res, next) => {
  // Ensure the body is not undefined
  if (!req.body) {
    return res.status(400).send({ error: 'Invalid request, no body provided' });
  }
  // Extract email and password from the body safely
  const { inemail, inpassword } = req.body;

  if (!inemail || !inpassword) {
    return res.status(400).send({ error: 'Email and password are required' });
  }

  const query = 'SELECT * FROM Users WHERE email = ?';

  let email = hash(inemail);
  let password = hash(inpassword);
  db.get(query, [email], (err, row) => {
    if (err) {
      return next(err);
    }
    if (!row) {
      // No user found with the provided email
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the stored password
    if (password === row.password) {
      // Successful login
      res.render('user', { title: 'LOGED IN SUCCESSFUL! HERE IS YOUR INFORMATION!', rows: [row] });
    } else {
      // Invalid password
      res.render('user', { title: 'ERROR', message: 'INVALID EMAIL OR PASSWORD' });
    }
  });
});

// Tell our application to listen to requests at port 3000 on the localhost
app.listen(port, () => {
  // When the application starts, print to the console that our app is
  // running at http://localhost:3000. Print another message indicating
  // how to shut the server down.
  console.log(`Web server running at: http://localhost:${port}`)
  console.log(`Type Ctrl+C to shut down the web server`)
})
