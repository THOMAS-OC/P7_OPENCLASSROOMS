const express = require("express");
const router = express.Router()
const controller = require('../controllers/commentController')
const auth = require('../middleware/auth')

// CREATE : testé et ok
router.post('/:postId/:userId', controller.createComment)

// READ : testé et ok
router.get('/:postId', controller.readComment)

// UPDATE : testé et ok
router.put('/:commentId', controller.updateComment)

// DELETE : testé et ok
router.delete('/:commentId', controller.deleteComment)

module.exports = router;