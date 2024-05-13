
const express = require("express");
const router = express.Router()
const blogController = require('../controllers/BlogController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', blogController.createBlog)

router.delete('/delete/:id', blogController.deleteBlog)
router.get('/get-all', blogController.getAllBlog)
router.get('/get/:id', blogController.getDetailsBlog)
router.put('/update/:id', blogController.updateBlog)


// router.delete('/delete-many', blogController.deleteMany)


module.exports = router