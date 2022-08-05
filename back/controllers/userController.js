const connection = require("../db")
const bcrypt = require("bcrypt")
const cookieParser = require('cookie-parser')
const cryptojs = require("crypto-js")
const dotenv = require("dotenv")
dotenv.config()

// UPDATE INFORMATIONS : 
const updateUser = (req, res) => {
    let {userId, newEmail, newPassword} = req.body
    const emailCrypt = cryptojs.HmacSHA256(newEmail, process.env.CRYPTOEMAIL).toString()

    // update email and password
    if (newEmail && newPassword) {
        connection.query(
            `UPDATE users SET email = "${emailCrypt}", password = "${newPassword}" WHERE users.ID = ${userId}`,
            function(err, results, fields) {
                res.json({message : "Votre email et votre mot de passe ont bien été mis à jour"})
            }
        );
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

    // update password
    else {
        connection.query(
            `UPDATE users SET password = "${newPassword}" WHERE users.ID = ${userId}`,
            function(err, results, fields) {
                res.json({message : "Votre mot de passe a bien été mis à jour"})
            }
        );
    }


}

// DELETE USER : testé et ok
const deleteUser = (req, res) => {
    let userId = req.body.userId
    console.log(userId);

    if (req.body.admin == 1){
        res.status(401).json({message: "Vous ne pouvez pas supprimer le compte administrateur"})
    }

    else {
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

module.exports = { 
    deleteUser,
    updateUser
}