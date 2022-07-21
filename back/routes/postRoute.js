const express = require("express");
const router = express.Router()
const controller = require('../controllers/postController')

// CREATE
router.post('/create', controller.createPost)

// READ
router.get('/read', controller.readAllPosts)
router.get('/read', controller.readOnePost)

// UPDATE
router.post('/read', controller.updatePost)

// DELETE
router.delete('/read', controller.deletePost)

module.exports = router;