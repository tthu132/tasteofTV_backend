
const express = require("express");
const router = express.Router()
const commentController = require('../controllers/CommentControler');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', commentController.createBlog)

router.delete('/delete/:id', commentController.deleteBlog)
// router.get('/get-all', blogController.getAllBlog)
// router.get('/get/:id', blogController.getDetailsBlog)
router.put('/update/:id', commentController.updateBlog)
router.get('/getall/:id', commentController.getAllComment)
router.get('/getall2/:id', commentController.getAllComment2)




// router.delete('/delete-many', blogController.deleteMany)


module.exports = router