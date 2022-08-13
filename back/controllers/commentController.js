const connection = require("../db")

// CREATE COMMENT : testé et ok
const createComment = (req, res) => {
    let postId = req.body.postId
    let userId = req.body.userId
    let comment = req.body.comment

    connection.query(
        `SELECT * FROM posts WHERE ID= ${postId}`,
        function(err, results, fields) {

            if (err) {
                res.status(500).json(err)
            }

            else if (!results[0]){
                res.status(404).json({message: "Post introuvable"})
            }

            else {
                connection.query(
                    `INSERT INTO commentaires (ID, comment, post_id, user_id) VALUES (NULL, "${comment}", ${postId}, ${userId})`,
                    function(err, results, fields) {
            
                        console.log(err);
            
                        if (err){
                            res.status(500).json(err)
                        }
                        else {
                            res.status(201).json(results)
                        }
                   
                    }
                );
                
            }

        }
    );

}


// UPDATE COMMENT
const updateComment = (req, res) => {

    let commentId = req.params.commentId
    let newComment = req.body.comment

    connection.query(
        `SELECT * FROM commentaires WHERE ID= ${commentId}`,
        function(err, results, fields) {

            if (err) {
                res.status(500).json(err)
            }

            else if (!results[0]){
                res.status(404).json({message: "Commentaire introuvable"})
            }

            else {
                if (results[0]["user_id"] == req.body.userId || req.body.admin == 1){
                    connection.query(
                        `UPDATE commentaires SET comment = "${newComment}" WHERE commentaires.ID = ${commentId}`,
                        function(err, results, fields) {
                            if (err){
                                res.status(500).json(err)
                            }
                            else {
                                res.status(201).json(results)
                            }
                        }
                    );
                }
                else {
                    res.status(401).json({message: "Modification non autorisée"})
                }
            }

        }
    );

}

// DELETE COMMENT
const deleteComment = (req, res) => {

    let commentId = req.params.commentId

    connection.query(
        `SELECT * FROM commentaires WHERE ID= ${commentId}`,
        function(err, results, fields) {

            if (err) {
                res.status(500).json(err)
            }

            else if (!results[0]){
                res.status(404).json({message: "Commentaire introuvable"})
            }

            else {
                if (results[0]["user_id"] == req.body.userId || req.body.admin == 1){
                    connection.query(
                        `DELETE FROM commentaires WHERE commentaires.ID = ${commentId}`,
                        function(err, results, fields) {
                            if (err) {
                                res.status(500).json(err)
                            }
                            else {
                                res.status(204).json(results)
                            }
                        }
                    );
                }
                else {
                    res.status(401).json({message: "Suppression non autorisée"})
                }
            }

        }
    );

}


module.exports = { 
    createComment,
    updateComment,
    deleteComment
}