const connection = require("../db")
const bcrypt = require("bcrypt")

const createUser = (req, res) =>{
    let email = req.body.email
    let password = req.body.password

    let userExist = false

    connection.query(
        `SELECT ID FROM users WHERE email = '${email}'`,
        function(err, results, fields) {
            if (results[0]){
                userExist = true
                console.log("Utilisateur existant");
                res.json(userExist)
            }
            else {
                console.log("Utilisateur inexistant");
                userExist = false
                bcrypt.hash(password, 5)
                .then(hash => {
                    console.log(hash);
                    connection.query(
                        `INSERT INTO users (email, password, ID) VALUES ('${email}', '${hash}', NULL)`,
                        function(err, results, fields) {
                            console.log(results);
                            res.json({message : "Utilisateur crée"})
                        }
                    )
                })
                .catch(err => res.json(err))
            }

        }
    );

}

const loginUser = (req, res) => {

    connection.query(
        `SELECT * FROM users WHERE email = "${req.body.email}"`,
        function(err, results, fields) {
            console.log(results);
        }
    );

}

module.exports = { 
    createUser,
    loginUser
}