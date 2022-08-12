const express = require("express");
const router = express.Router()
const controller = require('../controllers/commentController')
const auth = require('../middleware/auth')
const commentValidator = require('../middleware/commentValidator')

// CREATE
router.post('/', auth, commentValidator, controller.createComment)

// UPDATE
router.put('/:commentId', auth, commentValidator, controller.updateComment)

// DELETE
router.delete('/:commentId', auth, controller.deleteComment)

module.exports = router;