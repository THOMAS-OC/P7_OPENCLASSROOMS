const connection = require("../db")
const bcrypt = require("bcrypt")

const createUser = (req, res) =>{
    let nom = req.body.nom
    let prenom = req.body.prenom
    let age = req.body.age
    let email = req.body.email
    let password = req.body.password

    let userExist = false

    connection.query(
        `SELECT ID FROM users WHERE email = '${email}'`,
        function(err, results, fields) {
            if (results[0]){
                userExist = true
                console.log("Utilisateur existant");
                res.json({message: "Utilisateur déjà existant"})
            }
            else {
                console.log("Utilisateur inexistant");
                userExist = false
                bcrypt.hash(password, 5)
                .then(hash => {
                    console.log(hash);
                    connection.query(
                        `INSERT INTO users (email, password, nom, prenom, age, ID) VALUES ('${email}', '${hash}', '${nom}', '${prenom}', '${age}', NULL)`,
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

}

module.exports = { 
    createUser,
    loginUser
}