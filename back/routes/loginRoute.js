const express = require("express");
const router = express.Router()
const controller = require('../controllers/loginController')
const passValidator = require('../middleware/passValidator')

// CREATE ACCOUNT testé et ok
router.post('/signup', passValidator, controller.createUser)

// READ
router.post('/login', controller.loginUser)

// READ
router.post('/checkemail', controller.checkEmail)

// DELETE
router.get('/logout', controller.logoutUser)


module.exports = router;