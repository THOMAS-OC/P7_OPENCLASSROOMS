const connection = require("../db")
const bcrypt = require("bcrypt")

// READ INFORMATIONS : testé et ok
const readUser = (req, res) => {
    let userId = req.body.userId
    connection.query(
        `SELECT email, password FROM users WHERE id = ${userId}`,
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
                res.json({message : "Email et mot de passe mis à jour"})
            }
        );
    }

    // update email
    else if (newEmail) {
        connection.query(
            `UPDATE users SET email = "${newEmail}" WHERE users.ID = ${userId}`,
            function(err, results, fields) {
                res.json({message : "Email mis à jour"})
            }
        );
    }

    // update password
    else {
        connection.query(
            `UPDATE users SET password = "${newPassword}" WHERE users.ID = ${userId}`,
            function(err, results, fields) {
                res.json({message : "Mot de passe mis à jour"})
            }
        );
    }


}

// DELETE USER : testé et ok
const deleteUser = (req, res) => {
    let userId = req.body.userId
    console.log(userId);
    connection.query(
        `DELETE FROM users WHERE users.id = ${userId}`,
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            res.json({message : "User delete"})
        }
    );
}

module.exports = { 
    readUser,
    deleteUser,
    updateUser
}