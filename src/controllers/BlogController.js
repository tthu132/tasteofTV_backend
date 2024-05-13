const BlogService = require('../services/BlogService')

const createBlog = async (req, res) => {
    try {
        const { title, video, idProduct } = req.body
        console.log('product tu backend ', req.body);

        if (!title || !video || !idProduct) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is requireddd'
            })
        }
        const response = await BlogService.createBlog(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllBlog = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await BlogService.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {

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
        const response = await BlogService.deleteProduct(productId)
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



        const response = await BlogService.updateProduct(productId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createBlog,
    getAllBlog,
    getDetailsBlog,
    deleteBlog,
    updateBlog

}