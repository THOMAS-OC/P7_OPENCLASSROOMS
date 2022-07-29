const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv")
dotenv.config()
const connection = require("./db.js")

const multer = require("multer")
const upload = multer({dest: 'images/'})
const bcrypt = require("bcrypt")
const cookieParser = require('cookie-parser')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next();
});

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// gestion des cookies
app.use(cookieParser())
// GESTION DES FICHIERS STATIQUES
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to API groupomania" });
});

// IMPORT ROUTEUR
const postRoute = require('./routes/postRoute');
const loginRoute = require('./routes/loginRoute');
const commentRoute = require('./routes/commentRoute')
const userRoute = require('./routes/userRoute')

// Middleware route post
  app.use('/api/post', postRoute)
// Middleware route login
  app.use('/api/auth', loginRoute)
// Middleware route comment
  app.use('/api/comment', commentRoute)
// Middleware route comment
  app.use('/api/user', userRoute)


const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}.`);
});
