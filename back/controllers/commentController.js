const connection = require("../db")

// CREATE COMMENT
const createComment = (req, res) => {
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
}

// READ COMMENT
const readComment = (req, res) => {

    res.json({message : "Lecture du commentaire"})
    
}

// UPDATE COMMENT
const updateComment = (req, res) => {

    res.json({message : "Commentaire mis à jour"})

}

// DELETE COMMENT
const deleteComment = (req, res) => {

    res.json({message : "Commentaire supprimé"})

}


module.exports = { 
    createComment,
    readComment,
    updateComment,
    deleteComment
}