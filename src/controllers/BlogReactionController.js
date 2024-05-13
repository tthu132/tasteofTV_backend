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