const connection = require("../db")

// CREATE POST
const createPost = (req, res) => {
    let userId = req.body.userId
    let title = req.body.title
    let content = req.body.content
    connection.query(
        `INSERT INTO posts (date, title, picture, content, ID, user_id) VALUES (CURRENT_TIMESTAMP, '${title}', '/images/test.jpg', '${content}', NULL, ${userId})`,
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
    console.log(req.body);
    connection.query(
        `SELECT * FROM likes WHERE likes.post_id = ${postId} AND likes.user_id = ${userId}`,
        function(err, results, fields) {
            if(results[0]){
                res.status(409).json({message: "Like existant"})
            }
            else {
                connection.query(
                    `INSERT INTO likes (post_id, user_id, VALUE) VALUES (${postId}, ${userId}, ${valueLike});`,
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



// READ ALL POSTS : METHODE 1
const readAllPosts = (req, res) => {
    let listIds = []
    connection.query(

        `SELECT posts.ID FROM posts ORDER BY date DESC`,
        function(err, results, fields) {
            for (let id of results){
                listIds.push(id.ID)
            }
            console.log(listIds);
            res.json(listIds)
        }
    );

}

// READ ALL POST METHOD 2
const readOnePost = (req, res) => {
    let postId = req.params.postId
    let bddFront = {
        ID : "",
        userIdCreated : "",
        title : '',
        date : '',
        picture : '',
        content : '',
        commentOnly : [], // commentaire seul sans info user
        comment : [],
        likes : [], // listes des identifiants utilisateurs ayant like
        dislikes : [] // listes des identifiants utilisateurs ayant dislike
    }
    connection.query(
        `SELECT posts.ID as postId, likes.user_id as like_user_id, likes.VALUE as value_like, title, date, picture, content, comment, posts.user_id, commentaires.user_id as comment_user_id, commentaires.ID as comment_id FROM posts LEFT JOIN commentaires ON posts.ID = commentaires.post_id LEFT JOIN likes ON posts.ID = likes.post_id WHERE posts.ID = ${postId}`,
        function(err, results, fields) {
            console.log(err);
            console.log(results);
            bddFront.ID = results[0]["postId"]
            bddFront.userIdCreated = results[0]["user_id"]
            bddFront.title = results[0]["title"]
            bddFront.date = results[0]["date"]
            bddFront.picture = results[0]["picture"]
            bddFront.content = results[0]["content"]

            // récupération des commentaires
            for (let comment of results) {

                if (comment.comment){

                    if (!bddFront.commentOnly.includes(comment.comment)){
                        bddFront.comment.push({auteur : '', commentaire : comment.comment, id : comment.comment_id, userId : comment.comment_user_id})
                        bddFront.commentOnly.push(comment.comment)
                    }

                }

            }

            // Récupération des likes et dislikes
            for (let like of results){
                if (like.value_like){
                    if (like.value_like == 1){
                        console.log(like);
                        if (!bddFront.likes.includes(like.like_user_id)) {
                            bddFront.likes.push(like.like_user_id)                   
                        }
                    }
                    else {
                        if (!bddFront.dislikes.includes(like.like_user_id)) {
                            bddFront.dislikes.push(like.like_user_id)                   
                        }
                    }
                }

            }
            res.json(bddFront)
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