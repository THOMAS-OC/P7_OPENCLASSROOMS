const express = require("express");
const router = express.Router()
const controller = require('../controllers/loginController')
const passValidator = require('../middleware/passValidator')
const registerValidator = require('../middleware/registerValidator')
const mailValidator = require('../middleware/mailValidator')
const auth = require('../middleware/auth')
const rateLimit = require('express-rate-limit')

const AccountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 5, // Limit each IP to 5 conenct account requests per `window` (here, per hour)
	message:
		'Dépassement du nombre de tentatives de connexion, IP bloqué pour 1h.',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// CREATE ACCOUNT

router.post('/signup', passValidator, registerValidator, controller.createUser)

// CONNECT *
// router.post('/login', AccountLimiter passValidator, mailValidator, controller.loginUser)
router.post('/login', passValidator, mailValidator, controller.loginUser)

// READ
router.post('/checkemail', controller.checkEmail)

// CHECK CONNECTION
router.get('/checkconnect', auth, controller.checkConnected)

// DELETE
router.get('/logout', controller.logoutUser)


module.exports = router;