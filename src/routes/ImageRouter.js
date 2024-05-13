const express = require("express");
const router = express.Router()
const imagesController = require('../controllers/imagesController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', imagesController.create)

router.delete('/delete/:id', imagesController.deleteProduct)
router.get('/get-all', imagesController.getAllProduct)
router.get('/get/:id', imagesController.getDetailsProduct)

router.post('/delete-many', authMiddleWare, imagesController.deleteMany)


module.exports = router