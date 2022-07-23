const express = require("express");
const router = express.Router()
const controller = require('../controllers/postController')


// CREATE
router.post('/', controller.createPost)

// SYSTEME DE LIKE

// Ajout d'un like ou d'un dislike : testé et ok
router.post('/addLike', controller.addLike)

// Suppression d'un like ou d'un dislike : testé et ok
router.delete('/deleteLike', controller.deleteLike) 

// READ : testé et ok
router.get('/', controller.readAllPosts)
router.get('/:postId', controller.readOnePost)

// UPDATE
router.put('/', controller.updatePost)

// DELETE : testé et ok
router.delete('/:postId', controller.deletePost)

module.exports = router;