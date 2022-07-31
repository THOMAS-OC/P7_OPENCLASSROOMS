const connection = require("../db")

// CREATE COMMENT : testé et ok
const createComment = (req, res) => {
    let postId = req.body.postId
    let userId = req.body.userId
    let comment = req.body.comment

    connection.query(
        `INSERT INTO commentaires (ID, comment, post_id, user_id) VALUES (NULL, "${comment}", ${postId}, ${userId})`,
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(err);
            res.json(results)
        }
    );
}

// READ ALL COMMENTS FOR ONE POST : testé et ok
const readComment = (req, res) => {

    let postId = req.params.postId
    connection.query(
        `SELECT * FROM commentaires WHERE post_id = ${postId}`,
        function(err, results, fields) {
            
            console.log(results); // results contains rows returned by server
            res.json(results)
        }
    );

}

// UPDATE COMMENT : testé et ok
const updateComment = (req, res) => {

    let commentId = req.params.commentId
    let newComment = req.body.comment

    connection.query(
        `SELECT * FROM commentaires WHERE ID= ${commentId}`,
        function(err, results, fields) {

            if (!results[0]){
                res.status(404).json({message: "Commentaire introuvable"})
            }

            else {
                if (results[0]["user_id"] == req.body.userId || req.body.admin == 1){
                    connection.query(
                        `UPDATE commentaires SET comment = "${newComment}" WHERE commentaires.ID = ${commentId}`,
                        function(err, results, fields) {
                            res.json(results)
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

// DELETE COMMENT : testé et ok
const deleteComment = (req, res) => {

    let commentId = req.params.commentId

    connection.query(
        `SELECT * FROM commentaires WHERE ID= ${commentId}`,
        function(err, results, fields) {

            if (!results[0]){
                res.status(404).json({message: "Commentaire introuvable"})
            }

            else {
                if (results[0]["user_id"] == req.body.userId || req.body.admin == 1){
                    connection.query(
                        `DELETE FROM commentaires WHERE commentaires.ID = ${commentId}`,
                        function(err, results, fields) {
                            console.log(results); // results contains rows returned by server
                            res.json(results)
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
    readComment,
    updateComment,
    deleteComment
}