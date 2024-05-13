const express = require("express");
const router = express.Router()
const ProductCategoryController = require('../controllers/ProductCategoryController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', ProductCategoryController.create)
router.put('/update/:id', ProductCategoryController.updateProduct)
// router.get('/get-details/:id', ProductCategoryController.getDetailsProduct)
router.delete('/delete/:id', authMiddleWare, ProductCategoryController.deleteProduct)
router.get('/get-all', ProductCategoryController.getAllProduct)
router.post('/delete-many', authMiddleWare, ProductCategoryController.deleteMany)
// router.get('/get-all-type', ProductCategoryController.getAllType)

module.exports = router