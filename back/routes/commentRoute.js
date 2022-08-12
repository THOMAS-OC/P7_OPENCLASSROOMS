const express = require("express");
const router = express.Router()
const controller = require('../controllers/commentController')
const auth = require('../middleware/auth')

// CREATE
router.post('/', auth, controller.createComment)

// UPDATE
router.put('/:commentId', auth, controller.updateComment)

// DELETE
router.delete('/:commentId', auth, controller.deleteComment)

module.exports = router;