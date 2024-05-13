const ProductService = require('../services/ImageService')
const Product = require('../models/ProductModel')

const create = async (req, res) => {
    try {
        const { image } = req.body
        console.log('demm', req.body);

        // if (!image) {
        //     return res.status(200).json({
        //         status: 'ERR',
        //         message: 'The input is requireddd'
        //     })
        // }
        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body


        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }



        const response = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        console.log('body ', req.params.id);
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const productsToUpdate = await Product.find({ idsImage: productId });
        console.log('product cần xóa ', productsToUpdate);
        // Duyệt qua từng sản phẩm và loại bỏ productId khỏi mảng idsImage
        await Promise.all(productsToUpdate.map(async (product) => {
            // Lọc ra các id khác với productId
            product.idsImage = product.idsImage.filter(id => id.toString() !== productId);
            // Lưu sản phẩm sau khi cập nhật
            await product.save();
        }));
        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await ProductService.deleteManyProduct(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await ProductService.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        console.log('loiiiiii')

        return res.status(404).json({
            message: e
        })
    }
}


const getAllType = async (req, res) => {
    try {
        const response = await ProductService.getAllType()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    create,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteMany,
    getAllType
}