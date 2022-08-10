const connection = require("../db")
const bcrypt = require("bcrypt")
const cookieParser = require('cookie-parser')
const cryptojs = require("crypto-js")
const dotenv = require("dotenv")
const path = require("path")
const fs = require('fs')
dotenv.config()

// UPDATE INFORMATIONS : 
const updateUser = (req, res) => {

    let {userId, newEmail, newPassword} = req.body
    const emailCrypt = cryptojs.HmacSHA256(newEmail, process.env.CRYPTOEMAIL).toString()

    // update email and password
    if (newEmail && newPassword) {

        bcrypt.hash(newPassword, 5)
        .then(hash => {
            connection.query(
                `UPDATE users SET email = "${emailCrypt}", password = "${hash}" WHERE users.ID = ${userId}`,
                function(err, results, fields) {
                    res.json({message : "Votre email et votre mot de passe ont bien été mis à jour"})
                }
            );
        })

        .catch(err => res.json(err))

    }

    // update email
    else if (newEmail) {
        connection.query(
            `UPDATE users SET email = "${emailCrypt}" WHERE users.ID = ${userId}`,
            function(err, results, fields) {
                res.json({message : "Votre email a bien été mis à jour"})
            }
        );
    }

    // update password only

    else {
        bcrypt.hash(newPassword, 5)
        .then(hash => {
            connection.query(
                `UPDATE users SET password = "${hash}" WHERE users.ID = ${userId}`,
                function(err, results, fields) {
                    res.json({message : "Votre mot de passe a bien été mis à jour"})
                }
            );
        })
        .catch(err => res.json(err))
    }
}

// DELETE USER : testé et ok
const deleteUser = (req, res) => {
    let userId = req.body.userId
    console.log("user id delete");
    console.log(userId);
    console.log("user id delete");
    if (req.body.admin == 1){
        res.status(401).json({message: "Vous ne pouvez pas supprimer le compte administrateur"})
    }

    else {
        connection.query(
            `SELECT pictureprofil FROM users WHERE ID = ${userId}`,
            function(err, results, fields) {
                if (err){
                    res.json("err")
                }
                else {
                    // DELETE IMAGE
                    let urlImage = results[0]["pictureprofil"]
                    indexSlash = urlImage.lastIndexOf('/') + 1
                    urlImage = urlImage.slice(indexSlash,);
                    let pathImage = path.join(process.cwd(), 'images', urlImage)
                    console.log(pathImage);
                    if (urlImage != "profil_vierge.jpg"){
                        console.log("delete picture profil");
                        fs.unlinkSync(pathImage)
                    }
                    // DELETE IN BDD
                    connection.query(
                        `DELETE FROM users WHERE ID = ${userId}`,
                        function(err, results, fields) {
                            if (err){
                                res.json("err")
                            }
                            else {
                                console.log(results); 
                                res.clearCookie("auth")
                                res.json({message : "User delete"})
                            }
                        }
                    );
                }
            }
        );


    }
    
}

const addProfilPicture = (req, res) => {

    let fullPath = "https://localhost:3001/images/" + req.body.nameImage + req.body.userId + "." + req.body.extensionFile
    console.log(fullPath);

    console.log(req.body.extensionFile);

    connection.query(

        `UPDATE users SET pictureprofil = "${fullPath}" WHERE users.ID = ${req.body.userId}`,
        function(err, results, fields) {

            if (err){
                res.json(err)
            }
            else {
                console.log(results); 
                res.status(201).json({pictureProfil : fullPath})
            }
            
        }

    );
}

module.exports = { 
    deleteUser,
    updateUser,
    addProfilPicture
}