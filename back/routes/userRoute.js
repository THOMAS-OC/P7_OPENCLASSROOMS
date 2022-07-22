const express = require("express");
const router = express.Router()
const controller = require('../controllers/userController')

// CREATE
router.post('/create', controller.readUser)

// DELETE
router.delete('/read', controller.deleteUser)


module.exports = router;