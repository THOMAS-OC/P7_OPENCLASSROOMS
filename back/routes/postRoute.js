const express = require("express");
const router = express.Router()
const controller = require('../controllers/postController')
const auth = require('../middleware/auth')

// Limitation du nombre de requete pour une même ip
const rateLimit = require('express-rate-limit')

const createPostLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 5, // Limit each IP to 5 create post requests per `window` (here, per hour)
	message:
		'Volume de création de post dépassé durant la dernière heure',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// CREATE A POST
router.post('/', auth, createPostLimiter, controller.createPost)

// SYSTEME DE LIKE
router.post('/like', auth, controller.like)

// READ : testé et ok
router.get('/', auth, controller.readAllPosts)
router.get('/:postId', auth, controller.readOnePost)

// UPDATE
router.put('/:postId', auth, controller.updatePost)

// DELETE : testé et ok
router.delete('/:postId', auth, controller.deletePost)

module.exports = router;