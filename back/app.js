const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv")
dotenv.config()
const connection = require("./db.js")

const multer = require("multer")
const upload = multer({dest: 'images/'})
const bcrypt = require("bcrypt")

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


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

// CREATE USER
app.post('/api/user/add', userController.createUser)

// READ USER DATA
app.get('/api/user/:id', userController.readUser)

// DELETE USER
app.delete('/api/user/:id', userController.deleteUser)

// READ ALL POSTS
app.get("/api/articles", postController.readAllPosts )

// READE ONE POST
app.get("/api/article/:id", postController.readOnePost);

// CREAT POST
app.post("/api/article/:userId", upload.single('nameImage'), postController.createPost);

// DELETE POST
app.delete("/api/article/:idPost", postController.deletePost);

// CREAT COMMENT
app.post("/api/article/comment/:idPost/:userId", commentController.createComment);


const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}.`);
});
