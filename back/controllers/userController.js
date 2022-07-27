const connection = require("../db")
const bcrypt = require("bcrypt")
const cookieParser = require('cookie-parser')

// READ INFORMATIONS : testé et ok
const readUser = (req, res) => {

    let userId = req.body.userId
    connection.query(
        `SELECT email, name, firstname FROM users WHERE id = ${userId}`,
        function(err, results, fields) {
            console.log(results[0]); // results contains rows returned by server
            res.json(results[0])
        }
    );
}

// UPDATE INFORMATIONS : 
const updateUser = (req, res) => {
    let {userId, newEmail, newPassword} = req.body

    // update email and password
    if (newEmail && newPassword) {
        connection.query(
            `UPDATE users SET email = "${newEmail}", password = "${newPassword}" WHERE users.ID = ${userId}`,
            function(err, results, fields) {
                res.json({message : "Votre email et votre mot de passe ont bien été mis à jour"})
            }
        );
    }

    // update email
    else if (newEmail) {
        connection.query(
            `UPDATE users SET email = "${newEmail}" WHERE users.ID = ${userId}`,
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
    connection.query(
        `DELETE FROM users WHERE ID = ${userId}`,
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(err);
            res.json({message : "User delete"})
        }
    );
}

module.exports = { 
    readUser,
    deleteUser,
    updateUser
}