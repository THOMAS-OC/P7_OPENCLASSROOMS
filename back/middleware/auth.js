const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')

module.exports = (req, res, next) => {

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
            console.log(decodedToken.id);
            req.body.userId = decodedToken.id
            req.body.admin = decodedToken.admin
            return next()
        }
    })

}