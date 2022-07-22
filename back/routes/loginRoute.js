const express = require("express");
const router = express.Router()
const controller = require('../controllers/loginController')

// CREATE
router.post('/create', controller.createUser)

// READ
router.get('/read', controller.loginUser)


module.exports = router;