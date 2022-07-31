const express = require("express");
const router = express.Router()
const controller = require('../controllers/userController')
const auth = require('../middleware/auth')

// READ INFORMATIONS : testé et ok
router.put('/', auth, controller.updateUser)

// DELETE USER : testé et ok
router.delete('/', auth, controller.deleteUser)

module.exports = router;