const path = require("path")
const fs = require("fs")
const connection = require("../db")

module.exports = (req, res, next) => {
    let postId = req.params.postId
    // IF UPDATE INFO : NO DELETE
    if(req.headers['content-type'] == "application/json"){
         next()
    }
        
    // ELSE IF INFO AND IMAGE : DELETE
    else {
        connection.query(
            `SELECT * FROM posts WHERE ID= ${postId}`,
            function(err, results, fields) {
    
                if (!results[0]){
                    res.status(404).json({message: "Post introuvable"})
                }
    
                else {
                    if (results[0]["user_id"] == req.body.userId || req.body.admin == 1){
    
                        // DELETE IMAGE
                        let urlImage = results[0]["picture"]
                        
                        if (urlImage){
                            let indexSlash = urlImage.lastIndexOf('/') + 1
                            urlImage = urlImage.slice(indexSlash,);
                            let pathImage = path.join(process.cwd(), 'images/post', urlImage)
                            fs.unlinkSync(pathImage)
                        }
                        next()
                    }
                    else {
                        res.status(401).json({message: "Suppression non autorisée"})
                    }
                }
    
            }
        );
        
    }
};