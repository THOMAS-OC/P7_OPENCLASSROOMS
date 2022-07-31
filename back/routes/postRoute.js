const express = require("express");
const router = express.Router()
const controller = require('../controllers/postController')
const auth = require('../middleware/auth')

// CREATE
router.post('/', auth, controller.createPost)

// SYSTEME DE LIKE
router.post('/like', controller.like)

// READ : testé et ok
router.get('/', auth, controller.readAllPosts)
router.get('/:postId', auth, controller.readOnePost)

// UPDATE
router.put('/', auth, controller.updatePost)

// DELETE : testé et ok
router.delete('/:postId', auth, controller.deletePost)

module.exports = router;