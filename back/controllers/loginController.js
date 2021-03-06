const connection = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')


// CREATE : testé et ok
const createUser = (req, res) =>{
    console.log(req.body);
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

    connection.query(
        `SELECT * FROM users WHERE email = "${req.body.email}"`,
        function(err, results, fields) {

            if(results[0]) {

                const user = {
                    id: results[0]["ID"],
                    admin: results[0]["admin"],
                    name: results[0]["name"],
                    firstname: results[0]["firstname"],
                    email: results[0]["email"],
                    pictureprofil: results[0]["pictureprofil"],
                };

                console.log(user);
                const authToken = jwt.sign(user, process.env.KEYJWT, {expiresIn: '5400s'})
                console.log("la clef jwt ci desssous");
                console.log(authToken);
                res.cookie("auth", authToken)
                
                const userInDb = results[0]
                bcrypt.compare(req.body.password, userInDb.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({message: 'Paire login/mot de passe incorrecte'});
                    }
                    res.cookie("auth", authToken)
                    res.status(200).json({token : authToken, user:user});
                })

            }

            else {
                res.status(401).json({message: "Utilisateur introuvable"})
            }

        }
    );

}

const logoutUser = (req, res) => {
    res.clearCookie("auth")
    res.json({message : "Utilisateur déconnecté"})
}

const checkEmail = (req, res) => {
    connection.query(
        `SELECT * FROM users WHERE email = "${req.body.email}"`,
        function(err, results, fields) {

            if(results[0]) {
                res.status(200).json({userExist : true})
            }

            else {
                res.status(200).json({userExist : false})
            }

        }
    );
}

module.exports = { 
    createUser,
    loginUser,
    logoutUser,
    checkEmail
}