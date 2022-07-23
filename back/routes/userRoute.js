const express = require("express");
const router = express.Router()
const controller = require('../controllers/userController')

// READ INFORMATIONS : testé et ok
router.get('/', controller.readUser)

// READ INFORMATIONS : testé et ok
router.put('/', controller.updateUser)

// DELETE USER : testé et ok
router.delete('/', controller.deleteUser)


module.exports = router;