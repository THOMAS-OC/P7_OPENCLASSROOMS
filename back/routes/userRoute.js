const express = require("express");
const router = express.Router()
const controller = require('../controllers/userController')
const auth = require('../middleware/auth')
const multer = require("multer")
const path = require("path")

const upload = multer(
    {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, path.join( __dirname, '../images'));
          req.body.destinationImage = path.join( __dirname, '../images')
        },
        filename: (req, file, cb) => {
          req.body.nameImage = Date.now() + '-' + file.originalname
          cb(null, Date.now() + '-' + file.originalname);
        }
      })
    }
);

// UPDATE PERSONAL INFORMATIONS : testé et ok
router.put('/', auth, controller.updateUser)

// UPDATE PICTURE PROFIL : en cours
router.post('/', upload.single('ProfilPicture'), auth, controller.addProfilPicture)

// DELETE USER : testé et ok
router.delete('/', auth, controller.deleteUser)

module.exports = router;