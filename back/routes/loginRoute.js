const express = require("express");
const router = express.Router()
const controller = require('../controllers/loginController')

// CREATE
router.post('/signUp', controller.createUser)

// READ
router.get('/login', controller.loginUser)


module.exports = router;