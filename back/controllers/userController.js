const connection = require("../db")
const bcrypt = require("bcrypt")

const readUser = (req, res) => {
    let idUser = req.params.id
    connection.query(
        `SELECT * FROM users WHERE id = ${idUser}`,
        function(err, results, fields) {
            console.log(results[0]); // results contains rows returned by server
            res.json(results[0])
        }
    );
}

const deleteUser = (req, res) => {
    let idUser = req.params.id
    connection.query(
        `DELETE * FROM users WHERE id = ${idUser}`,
        function(err, results, fields) {
            console.log(results[0]); // results contains rows returned by server
            res.json(results[0])
        }
    );
}

module.exports = { 
    readUser,
    deleteUser,
}