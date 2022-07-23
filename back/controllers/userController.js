const connection = require("../db")
const bcrypt = require("bcrypt")

// READ INFORMATIONS : testé et ok
const readUser = (req, res) => {
    let idUser = req.body.idUser
    connection.query(
        `SELECT email, password FROM users WHERE id = ${idUser}`,
        function(err, results, fields) {
            console.log(results[0]); // results contains rows returned by server
            res.json(results[0])
        }
    );
}

// DELETE USER : testé et ok
const deleteUser = (req, res) => {
    let idUser = req.body.idUser
    console.log(idUser);
    connection.query(
        `DELETE FROM users WHERE users.id = ${idUser}`,
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            res.json({message : "User delete"})
        }
    );
}

module.exports = { 
    readUser,
    deleteUser,
}