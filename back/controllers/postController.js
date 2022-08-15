const connection = require("../db")
// CREATE POST
const createPost = (req, res) => {

    if (req.headers['content-type'] == 'application/json'){
        let userId = req.body.userId
        let title = req.body.title
        let content = req.body.content
        connection.query(
            "INSERT INTO posts (date, title, content, ID, user_id) VALUES (CURRENT_TIMESTAMP, ?, ?, NULL, ?)",
            [title, content, userId],
            function(err, results, fields) {
                if(err) {
                    res.status(500).json(err)
                }
                else {
                    res.status(201).json(results)
                }
            }
        );
    }

    else{
        let fullPath = "http://localhost:3000/images/post/" + req.body.pathImage
        let userId = req.body.userId
        let title = req.body.title
        let content = req.body.content

        connection.query(
            "INSERT INTO posts (date, title, picture, content, ID, user_id) VALUES (CURRENT_TIMESTAMP, ?, ?, ?, NULL, ?)",
            [title, fullPath, content, userId],
            function(err, results, fields) {
                if(err) {
                    res.status(500).json(err)
                }
                else {
                    res.status(201).json(results)
                }
            }
        );

    }

}

// LIKE NEW SYSTEM
const like = (req, res) => {

    let userId = req.body.userId
    let postId = req.body.postId
    
    connection.query(

        `SELECT * FROM likes WHERE likes.post_id = ? AND likes.user_id = ?`,
        [postId, userId],
        function(err, results, fields) {

            // SI LE LIKE EXISTE ET EST DEJA PRESENT ON LE SUPPRIME SIMPLEMENT
            if (results[0]){
                connection.query(
                    // Suppression du like
                    "DELETE FROM likes WHERE likes.post_id = ? AND likes.user_id = ?",
                    [postId, userId],
                    function(err, results, fields) {
                        if(err){
                            res.status(500).json(err)
                        }
                        res.status(201).json(results)
                    }
                );
            }

            // SI AUCUN LIKE N'EXISTE, ON AJOUTE LE LIKE
            else if(!results[0]){
                connection.query(
        
                    `INSERT INTO likes (post_id, user_id) VALUES (?, ?)`,
                    [postId, userId],
                    function(err, results, fields) {
                        if(err){
                            res.status(500).json(err)
                        }
                        res.status(201).json(results)
                    }
                );
            }

        }
    );

}




// READ ALL POSTS : GET ALL ID's
const readAllPosts = (req, res) => {
    let listIds = []
    connection.query(

        `SELECT posts.ID FROM posts ORDER BY date DESC`,
        function(err, results, fields) {

            if (err) {
                res.status(500).json(err)
            }

            else if (!results[0]){
                res.status(404).json({message: "BDD VIDE"})
            }

            else {
                for (let id of results){
                    listIds.push(id.ID)
                }
                res.json(listIds)
            }

        }
    );
}

// READ ALL POSTS : GET ALL ID's
const readFiltersPosts = (req, res) => {
    let filterMaj = req.params.filter
    filterMaj = filterMaj.toUpperCase()
    let listIds = []
    connection.query(

        `SELECT posts.ID FROM posts LEFT JOIN users ON posts.user_id = users.ID 
        WHERE UPPER(posts.title) LIKE ? OR 
        UPPER(posts.content) LIKE ? OR 
        UPPER(users.name) LIKE ? OR
        UPPER(users.firstname) LIKE ? ORDER BY date DESC`,
        ["%" + filterMaj + "%", "%" + filterMaj + "%", "%" + filterMaj + "%", "%" + filterMaj + "%"],
        function(err, results, fields) {

            if (err){
                res.status(500).json(err)
            }

            else if (!results[0]){
                res.status(404).json({message: "Aucune correspondance liée à ces filtres ! "})
            }

            else {
                for (let id of results){
                    listIds.push(id.ID)
                }
                res.json(listIds)
            }

        }
    );

}

// READ ONE POST
const readOnePost = (req, res) => {
    let postId = req.params.postId

    let bddFront = {
        ID : "",
        admin : 0,
        userIdCreated : "",
        name : '',
        firstname : '',
        pictureprofil : '',
        title : '',
        date : '',
        picture : '',
        content : '',
        commentOnly : [], // commentaire seul sans info user
        comment : [],
        likes : [], // listes des identifiants utilisateurs ayant like
    }

    const queryPromise = () => {

        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT users.name, users.admin, users.firstname, users.pictureprofil, posts.ID as postId, likes.user_id as like_user_id, title, date, picture, content, comment, posts.user_id, commentaires.user_id as comment_user_id, commentaires.ID as comment_id FROM posts 
                LEFT JOIN commentaires ON posts.ID = commentaires.post_id 
                LEFT JOIN likes ON posts.ID = likes.post_id 
                LEFT JOIN users ON posts.user_id = users.ID WHERE posts.ID = ?`,
                [postId],
        
                function(err, results, fields) {

                    if (err){
                        res.status(500).json(err)
                    }

                    else if (!results[0]){
                        res.status(404).json({message: "post introuvable"})
                    }

                    else {
                        bddFront.ID = results[0]["postId"]
                        bddFront.admin = results[0]["admin"]
                        bddFront.userIdCreated = results[0]["user_id"]
                        bddFront.title = results[0]["title"]
                        bddFront.date = results[0]["date"]
                        bddFront.picture = results[0]["picture"]
                        bddFront.content = results[0]["content"]
                        bddFront.name = results[0]["name"]
                        bddFront.firstname = results[0]["firstname"]
                        bddFront.pictureprofil = results[0]["pictureprofil"]
                        // récupération des commentaires
                        for (let comment of results) {
            
                            if (comment.comment){
            
                                if (!bddFront.commentOnly.includes(comment.comment)){
                                    bddFront.comment.push({auteur : '', pictureprofil : '', commentaire : comment.comment, id : comment.comment_id, userId : comment.comment_user_id})
                                    bddFront.commentOnly.push(comment.comment)
                                }
            
                            }
            
                        }
            
                        // Récupération des likes
                        for (let like of results){
                            if (like.like_user_id){
                                if (!bddFront.likes.includes(like.like_user_id)) {
                                    bddFront.likes.push(like.like_user_id)           
                                }
                            }
                        }
                        return resolve(bddFront)
                    }
                }
            );
        })
    }
    
    queryPromise()
    .then(resultats => {
        let i = 0

        if (resultats.comment[0]){
            for (let resultat of resultats.comment){

                connection.query(
    
                    "SELECT name, firstname, pictureprofil FROM users WHERE ID=?",
                    [resultat.userId],
                    function(err, results, fields) {
                        if (err){
                            console.log(err);
                        }
                        resultat.auteur = results[0]['name'] + " " + results[0]['firstname']
                        resultat.pictureprofil = results[0]['pictureprofil']
                        i += 1
                        if (i == resultats.comment.length){
                            res.json(resultats)
                        }
                    }
    
                );
                
            }
        }

        else {
            res.json(resultats)
        }
 
        
    })
    
    .catch(error => {
        res.status(500).json(error)
    })

}

// UPDATE POST
const updatePost = (req, res) => {

    let postId = req.params.postId
    let newTitle = req.body.title
    let newContent = req.body.content

    // UPDATE WITHOUT PICTURE
    if(req.headers['content-type'] == "application/json"){
        connection.query(
            "SELECT * FROM posts WHERE ID= ?",
            [postId],
            function(err, results, fields) {
    
                if (!results[0]){
                    res.status(404).json({message: "Post introuvable"})
                }
    
                else {
                    if (results[0]["user_id"] == req.body.userId || req.body.admin == 1){
                        connection.query(
                            "UPDATE posts SET title = ?, content = ? WHERE posts.ID = ?",
                            [newTitle, newContent, postId],
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

    // UPDATE WITH PICTURE
    else {
        let fullPath = "http://localhost:3000/images/post/" + req.body.pathImage
        connection.query(
            `UPDATE posts SET title = ?, content = ?, picture = ? WHERE posts.ID = ?`,
            [newTitle, newContent, fullPath, postId],
            function(err, results, fields) {
                res.json(results)
            }
        );
    }
   
}

// DELETE POST : testé et ok
const deleteImage = (req, res) => {
    let postId = req.params.postId

    connection.query(
        "SELECT * FROM posts WHERE ID= ?",
        [postId],
        function(err, results, fields) {

            if (err) res.status(500).json(err)

            else if (!results[0]){
                res.status(404).json({message: "Post introuvable"})
            }

            else {
                if (results[0]["user_id"] == req.body.userId){
                    connection.query(
                        "UPDATE posts SET picture = NULL WHERE posts.ID = ?",
                        [postId],
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

// DELETE POST : testé et ok
const deletePost = (req, res) => {
    let postId = req.params.postId

    connection.query(
        "SELECT * FROM posts WHERE ID= ?",
        [postId],
        function(err, results, fields) {

            if (!results[0]){
                res.status(404).json({message: "Post introuvable"})
            }

            else {
                if (results[0]["user_id"] == req.body.userId || req.body.admin == 1){

                    // DELETE IMAGE
                    connection.query(
                        "DELETE FROM posts WHERE ID = ?",
                        [postId],
                        function(err, results, fields) {
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
    createPost,
    readAllPosts,
    readFiltersPosts,
    readOnePost,
    updatePost,
    deletePost,
    deleteImage,
    like,
}