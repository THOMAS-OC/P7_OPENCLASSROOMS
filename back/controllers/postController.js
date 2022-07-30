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

// NEW SYSTEM OF LIKE
const like = (req, res) => {

    let userId = req.body.userId
    let postId = req.body.postId
    let valueLike = req.body.valueLike

    console.log(req.body);

    // On envoie un like
    if (valueLike == 1){
        connection.query(
            `SELECT * FROM likes WHERE likes.post_id = ${postId} AND likes.user_id = ${userId}`,
            function(err, results, fields) {
                console.log(results[0]);

                // --> Si on ne trouve ni like ni dislike, on ajoute simplement un like
                if(!results[0]){
                    connection.query(

                        `INSERT INTO likes (post_id, user_id, ID, value) VALUES (${postId}, ${userId}, NULL, '1')`,
                        function(err, results, fields) {
                            if(err){
                                res.json(err)
                            }
                            console.log("Ajout de like");
                            res.json(results)
                        }
                    );
                }

                // --> Si like déjà présent, suppression du like, eviter les doublons
                else if (results[0]["value"] == 1) {

                    connection.query(

                        `DELETE FROM likes WHERE likes.post_id = ${postId} AND likes.user_id = ${userId}`,
                        function(err, results, fields) {
                            if(err){
                                res.json(err)
                            }
                            console.log("delete de like");
                            res.json(results)
                        }
                    );
                    
                }

                // --> Si dislike existant, suppression du dislike et ajout d'un like
                else if (results[0]["value"] == -1) {
                    connection.query(

                        // Suppression du dislike
                        `DELETE FROM likes WHERE likes.post_id = ${postId} AND likes.user_id = ${userId}`,
                        function(err, results, fields) {
                            if(err){
                                res.json(err)
                            }

                            // Ajout du like
                            connection.query(

                                `INSERT INTO likes (post_id, user_id, ID, value) VALUES (${postId}, ${userId}, NULL, '1')`,
                                function(err, results, fields) {
                                    if(err){
                                        res.json(err)
                                    }
                                    console.log("Suppression de dislike, ajout de like");
                                    res.json(results)
                                }

                            );

                        }
                    );
                }

                
            }
        );
    }

    else if (valueLike == -1){
        connection.query(
            `SELECT * FROM likes WHERE likes.post_id = ${postId} AND likes.user_id = ${userId}`,
            function(err, results, fields) {
                console.log(results[0]);

                // --> Si on ne trouve ni like ni dislike, on ajoute simplement un dislike
                if(!results[0]){
                    connection.query(

                        `INSERT INTO likes (post_id, user_id, ID, value) VALUES (${postId}, ${userId}, NULL, '-1')`,
                        function(err, results, fields) {
                            if(err){
                                res.json(err)
                            }
                            console.log("Ajout de dislike");
                            res.json(results)
                        }
                    );
                }

                // --> Si dislike déjà présent, suppression du dislike, eviter les doublons
                else if (results[0]["value"] == -1) {

                    connection.query(

                        `DELETE FROM likes WHERE likes.post_id = ${postId} AND likes.user_id = ${userId}`,
                        function(err, results, fields) {
                            if(err){
                                res.json(err)
                            }
                            console.log("delete de dislike");
                            res.json(results)
                        }
                    );
                    
                }

                // --> Si like existant, suppression du like et ajout d'un dislike
                else if (results[0]["value"] == 1) {
                    connection.query(

                        // Suppression du dislike
                        `DELETE FROM likes WHERE likes.post_id = ${postId} AND likes.user_id = ${userId}`,
                        function(err, results, fields) {
                            if(err){
                                res.json(err)
                            }

                            // Ajout du like
                            connection.query(

                                `INSERT INTO likes (post_id, user_id, ID, value) VALUES (${postId}, ${userId}, NULL, '-1')`,
                                function(err, results, fields) {
                                    if(err){
                                        res.json(err)
                                    }
                                    console.log("Suppression de like, ajout de dislike");
                                    res.json(results)
                                }

                            );

                        }
                    );
                }

                
            }
        );
    }

    else{
        res.status(403).json({message : "Donnée non valide"})
    }

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



// READ ALL POSTS : GET ALL ID's
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

// READ ONE POST
const readOnePost = (req, res) => {
    console.log("on lit un post");
    let postId = req.params.postId

    let bddFront = {
        ID : "",
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
        dislikes : [] // listes des identifiants utilisateurs ayant dislike
    }

    const queryPromise = () => {

        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT users.name, users.firstname, users.pictureprofil, posts.ID as postId, likes.user_id as like_user_id, likes.VALUE as value_like, title, date, picture, content, comment, posts.user_id, commentaires.user_id as comment_user_id, commentaires.ID as comment_id FROM posts 
                LEFT JOIN commentaires ON posts.ID = commentaires.post_id 
                LEFT JOIN likes ON posts.ID = likes.post_id 
                LEFT JOIN users ON posts.user_id = users.ID WHERE posts.ID = ${postId}`,
        
                function(err, results, fields) {
                    if (err){
                        console.log(err);
                    }
                    bddFront.ID = results[0]["postId"]
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
        
                    // Récupération des likes et dislikes
                    for (let like of results){
                        if (like.value_like){
                            if (like.value_like == 1){
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
                    return resolve(bddFront)
                }
            );
        })

    }

    queryPromise()
    .then(resultats => {
        console.log(resultats.comment[0]);
        console.log(typeof resultats.comment);
        let i = 0

        if (resultats.comment[0]){
            console.log("Gestion des commentaires");
            for (let resultat of resultats.comment){

                connection.query(
    
                    `SELECT name, firstname, pictureprofil FROM users WHERE ID=${resultat.userId}`,
                    function(err, results, fields) {
                        if (err){
                            console.log(err);
                        }
                        resultat.auteur = results[0]['name'] + " " + results[0]['firstname']
                        resultat.pictureprofil = results[0]['pictureprofil']
                        i += 1
                        console.log(i);
                        if (i == resultats.comment.length){
                            res.json(resultats)
                        }
                    }
    
                );
                
            }
        }

        else {
            console.log('Pas de commentaires sur ce post');
            res.json(resultats)
        }
 
        
    })
    .catch(error => {
        console.log("On log l'erreur");
        console.log(error);
    })


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
    like,
    addLike,
    deleteLike
}