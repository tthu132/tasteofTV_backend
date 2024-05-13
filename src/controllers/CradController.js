const CardService = require('../services/CardService')
const Product = require('../models/ProductModel')

const create = async (req, res) => {
    try {

        console.log('demm', req.body);


        const response = await CardService.createProduct(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }
}

const updateCart = async (req, res) => {
    try {
        const { user, product, newQuantity } = req.body;

        console.log(user, product, newQuantity);

        const response = await CardService.updateProduct(user, product, newQuantity)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }
}


const deleteCart = async (req, res) => {
    try {
        const cardId = req.params.id
        console.log('body ', req.params.id);
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }

        const response = await CardService.deleteCart(cardId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteMany = async (req, res) => {
    try {
        const { user, productList } = req.body;
        console.log('checkk', user, productList);
        console.log('checkk body', req.body);


        if (!user) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The user is required'
            })
        }
        const response = await CardService.deleteMany(user, productList)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message
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
    console.log('get');
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required 1'
            })
        }
        const response = await CardService.getDetailsProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }
}
const getById = async (req, res) => {
    try {
        const cardId = req.params.id
        if (!cardId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await CardService.getById(cardId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
module.exports = {
    getById,
    create,
    updateCart,
    getDetailsProduct,
    deleteCart,
    getAllProduct,
    deleteMany,
    getAllType
}