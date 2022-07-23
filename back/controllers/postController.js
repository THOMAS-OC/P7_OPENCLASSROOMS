const connection = require("../db")

// CREATE POST
const createPost = (req, res) => {
    let userId = req.params.userId
    let content = req.body.content
    console.log(req.body.content);
    connection.query(
        `INSERT INTO posts (date, picture, content, ID, user_id) VALUES ('2022-07-11', '/images/test.jpg', ${content}, NULL, ${userId})`,
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(err);
            res.json(results)
        }
    );
}

// CREATE LIKE : testé et ok

const addLike = (req, res) => {
    let userId = req.body.userId
    let postId = req.body.postId
    let valueLike = req.body.value

    connection.query(
        `SELECT * FROM likes WHERE likes.post_id = ${postId} AND likes.user_id = ${userId}`,
        function(err, results, fields) {
            if(results[0]){
                res.status(409).json({message: "Like existant"})
            }
            else {
                connection.query(
                    `INSERT INTO likes (post_id, user_id, ID, VALUE) VALUES (${postId}, ${userId}, NULL, ${valueLike});`,
                    function(err, results, fields) {
                        if (err) {
                            res.json(err)
                        }

                        else {
                            if (valueLike == 1){
                                res.status(200).json({message : "Like"})
                            }
                            else {
                                res.status(200).json({message : "Dislike"})
                            }
                        }

                    }
                );
            }
        }
    );


}



// READ ALL POSTS : testé et ok
const readAllPosts = (req, res) => {
    connection.query(
        `SELECT posts.ID, date, picture, content, comment FROM posts JOIN commentaires ON posts.ID = commentaires.post_id`,
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            res.json(results)
        }
    );
}

// READ ONE POST : testé et ok
const readOnePost = (req, res) => {
    let postId = req.params.postId
    connection.query(
        `SELECT posts.ID, date, picture, content, comment FROM posts JOIN commentaires ON posts.ID = commentaires.post_id WHERE posts.ID = ${postId}`,
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            res.json(results)
        }
    );
}

// UPDATE POST
const updatePost = (req, res) => {
    res.json({message : "Mise à jour du post"})
}

// DELETE POST : testé et ok
const deletePost = (req, res) => {
    let postId = req.params.postId
    connection.query(
        `DELETE FROM posts WHERE id = ${postId}`,
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            res.json(results)
        }
    );
}

// DELETE LIKE : testé et ok
const deleteLike = (req, res) => {
    let userId = req.body.userId
    let postId = req.body.postId
    connection.query(
        `DELETE FROM likes WHERE likes.post_id = ${postId} AND likes.user_id = ${userId}`,
        function(err, results, fields) {
            console.log(results.affectedRows); // results contains rows returned by server
            if (results.affectedRows){
                res.status(200).json({message: "Like supprimé"})
            }
            else {
                res.status(404).json({message: "Like introuvable en BDD"})
            }
        }
    );
}

module.exports = { 
    createPost,
    readAllPosts,
    readOnePost,
    updatePost,
    deletePost,
    addLike,
    deleteLike
}