const express = require("express");
const router = express.Router()
const controller = require('../controllers/loginController')

// CREATE ACCOUNT testé et ok
router.post('/signup', controller.createUser)

// READ
router.post('/login', controller.loginUser)


module.exports = router;