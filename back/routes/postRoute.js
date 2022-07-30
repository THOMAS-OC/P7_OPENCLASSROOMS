const express = require("express");
const router = express.Router()
const controller = require('../controllers/postController')
const auth = require('../middleware/auth')

// CREATE
router.post('/', auth, controller.createPost)

// SYSTEME DE LIKE

// Ajout d'un like ou d'un dislike : testé et ok
router.post('/addlike', auth, controller.addLike)

// Ajout d'un like ou d'un dislike : testé et ok
router.post('/like', auth, controller.like)

// Suppression d'un like ou d'un dislike : testé et ok
router.delete('/deletelike', auth, controller.deleteLike) 

// READ : testé et ok
router.get('/', auth, controller.readAllPosts)
router.get('/:postId', controller.readOnePost)

// UPDATE
router.put('/', auth, controller.updatePost)

// DELETE : testé et ok
router.delete('/:postId', auth, controller.deletePost)

module.exports = router;