const express = require("express");
const router = express.Router()
const cardController = require('../controllers/CradController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', cardController.create)

router.delete('/delete/:id', cardController.deleteCart)
router.get('/get-all', cardController.getAllProduct)
router.get('/get/:id', cardController.getDetailsProduct)
router.put('/update', cardController.updateCart)


router.delete('/delete-many', cardController.deleteMany)


module.exports = router