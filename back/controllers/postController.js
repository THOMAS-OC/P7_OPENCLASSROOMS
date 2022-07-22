const connection = require("../db")

// CREATE POST
const createPost = (req, res) => {
    console.log(req.file);
    let idUser = req.params.userId
    let content = req.body.content
    console.log(req.body.content);
    connection.query(
        `INSERT INTO posts (date, picture, content, ID, user_id) VALUES ('2022-07-11', '/images/test.jpg', ${content}, NULL, ${idUser})`,
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(err);
            res.json(results)
        }
    );
}

// READ ALL POSTS
const readAllPosts = (req, res) => {
    connection.query(
        `SELECT * FROM posts`,
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            res.json(results)
        }
    );
}

// READ ONE POST
const readOnePost = (req, res) => {
    let idPost = req.params.id
    connection.query(
        `SELECT * FROM posts WHERE id = ${idPost}`,
        function(err, results, fields) {
            console.log(results[0]); // results contains rows returned by server
            res.json(results[0])
        }
    );
}

// UPDATE POST
const updatePost = (req, res) => {
    res.json({message : "Mise à jour du post"})
}

// DELETE POST
const deletePost = (req, res) => {
    let idPost = req.params.idPost
    connection.query(
        `DELETE FROM posts WHERE id = ${idPost}`,
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            res.json(results)
        }
    );
}

module.exports = { 
    createPost,
    readAllPosts,
    readOnePost,
    updatePost,
    deletePost
}