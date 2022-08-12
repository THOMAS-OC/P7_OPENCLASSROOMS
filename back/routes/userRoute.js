const express = require("express");
const router = express.Router()
const controller = require('../controllers/userController')
const passValidator = require('../middleware/passValidator')
const updateUserValidator = require('../middleware/updateUserValidator')
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
          let extensionFile = file.mimetype
          extensionFile = extensionFile.slice(6,)
          req.body.extensionFile = extensionFile
          req.body.nameImage = 'picture_profil_'
          cb(null, 'picture_profil_' + req.params.id + '.' + extensionFile);
        }
      })
    }
);

// UPDATE PERSONAL INFORMATIONS : testé et ok
router.put('/', auth, passValidator, updateUserValidator, controller.updateUser)

// UPDATE PICTURE PROFIL : en cours
router.post('/:id', auth, upload.single('ProfilPicture'), auth, controller.addProfilPicture)

// DELETE USER : testé et ok
router.delete('/', auth, controller.deleteUser)

module.exports = router;