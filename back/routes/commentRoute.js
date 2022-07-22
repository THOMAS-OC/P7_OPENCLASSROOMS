const express = require("express");
const router = express.Router()
const controller = require('../controllers/commentController')

// CREATE : testé et ok
router.post('/create/:postId/:userId', controller.createComment)

// READ : testé et ok
router.get('/read/:postId', controller.readComment)

// UPDATE : testé et ok
router.put('/update/:commentId', controller.updateComment)

// DELETE : testé et ok
router.delete('/delete/:commentId', controller.deleteComment)

module.exports = router;