const express = require("express");
const router = express.Router()
const controller = require('../controllers/userController')

// READ
router.get('/', controller.readUser)

// DELETE
router.delete('/', controller.deleteUser)


module.exports = router;