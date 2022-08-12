const express = require("express");
const router = express.Router()
const controller = require('../controllers/postController')
const auth = require('../middleware/auth')
const deleteImage = require('../middleware/deleteImage')
const multer = require("multer")
const path = require("path")

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

// GESTION DES FICHIERS IMAGES
const upload = multer(
    {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, path.join( __dirname, '../images/post'));
        },
        filename: (req, file, cb) => {
          req.body.pathImage = Date.now() + '-' + file.originalname
          cb(null, Date.now() + '-' + file.originalname);
        }
      })
    }
);

// CREATE A POST
router.post('/', upload.single('picturePost'), auth, createPostLimiter, controller.createPost)

// SYSTEME DE LIKE
router.post('/like', auth, controller.like)

// READ
router.get('/', auth, controller.readAllPosts)
router.get('/:postId', auth, controller.readOnePost)

// UPDATE
router.put('/:postId', auth, deleteImage, upload.single('picturePost'), auth, controller.updatePost)

// DELETE
router.delete('/:postId', auth, deleteImage, controller.deletePost)

module.exports = router;