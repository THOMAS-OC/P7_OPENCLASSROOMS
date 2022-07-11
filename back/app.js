const express = require("express");
const app = express();
const dotenv = require("dotenv")
dotenv.config()
const connection = require("./db.js")
const postController = require("./controllers/postController")
const commentController = require("./controllers/commentController")
const userController = require("./controllers/userController")
const multer = require("multer")
const upload = multer({dest: 'images/'})

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json({ message: "Welcome to API groupomania" });
});

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
app.post("/api/article/comment/:idPost/:userId", (req, res) => {
    let idPost = req.params.idPost
    let idUser = req.params.userId
    let content = req.body.content

    connection.query(
        `INSERT INTO commentaires (ID, content, post_id, user_id) VALUES (NULL, "${content}", ${idPost}, ${idUser})`,
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(err);
            res.json(results)
        }
    );
});



const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}.`);
});