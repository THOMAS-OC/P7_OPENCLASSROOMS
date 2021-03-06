const express = require("express");
const router = express.Router()
const controller = require('../controllers/commentController')
const auth = require('../middleware/auth')

// CREATE : testé et ok
router.post('/', auth, controller.createComment)

// READ : testé et ok
router.get('/:postId', controller.readComment)

// UPDATE : testé et ok
router.put('/:commentId', auth, controller.updateComment)

// DELETE : testé et ok
router.delete('/:commentId', auth, controller.deleteComment)

module.exports = router;