const connection = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')
const cryptojs = require("crypto-js")
const dotenv = require("dotenv")
dotenv.config()
// CREATE : testé et ok
const createUser = (req, res) =>{
    console.log(req.body);
    const emailCrypt = cryptojs.HmacSHA256(req.body.email, process.env.CRYPTOEMAIL).toString()
    let password = req.body.password
    let name = req.body.name.toUpperCase()
    let firstname = req.body.firstname

    let userExist = false

    connection.query(
        "SELECT ID FROM users WHERE email = ? OR ( name = ? AND firstname = ? )",
        [emailCrypt, name, firstname],
        function(err, results, fields) {
            console.log(err);
            if (results[0]){
                res.json({userExist : true})
            }
            else {
                bcrypt.hash(password, 5)
                .then(hash => {
                    console.log(hash);
                    connection.query(
                        "INSERT INTO users (name, firstname, email, password) VALUES (?, ?, ?, ?)",
                        [name, firstname, emailCrypt, hash],
                        function(err, results, fields) {
                            if (err){
                                res.status(400).json(err);
                            }
                            else {
                                res.json({userCreate : true})
                            }
                        }
                    )
                })
                .catch(err => res.json(err))
            }

        }
    );

}

const loginUser = (req, res) => {
    const emailCrypt = cryptojs.HmacSHA256(req.body.email, process.env.CRYPTOEMAIL).toString()
    connection.query(
        "SELECT * FROM users WHERE email = ?",
        [emailCrypt],
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

                const authToken = jwt.sign(user, process.env.KEYJWT, {expiresIn: '5400s'})
                
                const userInDb = results[0]
                bcrypt.compare(req.body.password, userInDb.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({message: 'Paire login/mot de passe incorrecte'});
                    }
                    res.cookie("auth", authToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                    })
                    res.status(200).json({user:user});
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
    const emailCrypt = cryptojs.HmacSHA256(req.body.email, process.env.CRYPTOEMAIL).toString()

    connection.query(
        "SELECT * FROM users WHERE email = ?",
        [emailCrypt],
        
        function(err, results, fields) {

            if (err) {
                res.status(500).json(err)
            }

            else if(results[0]) {
                res.status(200).json({userExist : true})
            }

            else {
                res.status(404).json({userExist : false})
            }

        }
    );
}

const checkConnected = (req, res) => {

    const token = req.cookies.auth || false
    // Présence d'un token
    if (!token) {
        return res.status(401).json({ userConnected: 'false' })
    }

    // Véracité du token
    jwt.verify(token, process.env.KEYJWT, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ message: 'Error. Bad token' })
        } else {
            res.status(200).json({ userConnected: true })
        }
    })

}

module.exports = { 
    createUser,
    loginUser,
    logoutUser,
    checkEmail,
    checkConnected
}