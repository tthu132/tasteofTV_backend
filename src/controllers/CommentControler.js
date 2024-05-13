const CommentService = require('../services/CommentService')

const createBlog = async (req, res) => {
    try {
        const { content, idUser, idBlog } = req.body
        console.log('product tu backend ', req.body);

        if (!content || !idUser || !idBlog) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is requireddd'
            })
        }
        const response = await CommentService.createBlog(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }
}
const getAllBlog = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await BlogService.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        console.log('loiiiiii')

        return res.status(404).json({
            message: e
        })
    }
}
const deleteBlog = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await CommentService.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getDetailsBlog = async (req, res) => {
    console.log('get');
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required 1'
            })
        }
        const response = await BlogService.getDetailsProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }
}
const updateBlog = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body


        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }



        const response = await CommentService.updateProduct(productId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllComment = async (req, res) => {
    console.log('get');
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required 1'
            })
        }
        const response = await CommentService.getAllCommentsForBlog(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }
}
const getAllComment2 = async (req, res) => {
    console.log('get');
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required 1'
            })
        }
        const response = await CommentService.getCommentsForBlogWithReplies(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }
}
module.exports = {
    createBlog,
    getAllBlog,
    getDetailsBlog,
    deleteBlog,
    updateBlog,
    getAllComment,
    getAllComment2

}