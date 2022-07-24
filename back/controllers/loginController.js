const connection = require("../db")
const bcrypt = require("bcrypt")

// CREATE : testé et ok
const createUser = (req, res) =>{
    let email = req.body.email
    let password = req.body.password
    let name = req.body.name
    let firstname = req.body.firstname

    let userExist = false

    connection.query(
        `SELECT ID FROM users WHERE email = '${email}'`,
        function(err, results, fields) {
            if (results[0]){
                console.log("Utilisateur existant");
                res.json({userExist : true})
            }
            else {
                console.log("Utilisateur inexistant");
                bcrypt.hash(password, 5)
                .then(hash => {
                    console.log(hash);
                    connection.query(
                        `INSERT INTO users (name, firstname, email, password, ID) VALUES ('${name}', '${firstname}', '${email}', '${hash}', NULL)`,
                        function(err, results, fields) {
                            if (err){
                                console.log(err);
                            }
                            console.log(results);
                            res.json({userCreate : true})
                        }
                    )
                })
                .catch(err => res.json(err))
            }

        }
    );

}

const loginUser = (req, res) => {
    console.log("test");
    connection.query(
        `SELECT * FROM users WHERE email = "${req.body.email}"`,
        function(err, results, fields) {
            if(results[0]) {
                const userInDb = results[0]
                bcrypt.compare(req.body.password, userInDb.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({message: 'Paire login/mot de passe incorrecte'});
                    }
                    res.status(200).json({message : "Utilisateur connecté"});
                })

                
            }
            else {
                res.status(401).json({message: "Utilisateur introuvable"})
            }
        }
    );

}

module.exports = { 
    createUser,
    loginUser
}