const express = require("express");
const router = express.Router()
const controller = require('../controllers/commentController')

// CREATE
router.post('/create', controller.createComment)

// READ
router.get('/read', controller.readComment)

// UPDATE
router.post('/read', controller.updateComment)

// DELETE
router.delete('/read', controller.deleteComment)

module.exports = router;