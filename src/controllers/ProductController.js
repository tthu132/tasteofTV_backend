const Product = require('../models/ProductModel');
const ProductService = require('../services/ProductService')
const Image = require('../models/product-image');

const createProduct = async (req, res) => {
    try {
        const { name, countInStock, price, description, idProductCategory, idsImage } = req.body

        if (!name || !price) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is requireddd'
            })
        }
        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
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

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
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

const getType = async (req, res) => {
    try {
        const id = req.params.id
        const response = await ProductService.getType(id)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const getImageById = async (imageId) => {
    try {
        // Truy vấn dữ liệu từ model ảnh dựa trên ID ảnh
        const image = await Image.findById(imageId);
        // console.log(image);

        if (image) {
            return image.image; // Trả về URL của ảnh
        } else {
            return null; // Trả về null nếu không tìm thấy ảnh
        }
    } catch (error) {
        console.error('Error retrieving image by id:', error);
        throw error;
    }
};

const search = async (req, res) => {
    try {
        const name = req.query.q;

        // Lấy ra toàn bộ sản phẩm từ cơ sở dữ liệu
        const allProducts = await Product.find();

        // Chuyển đổi từ khóa tìm kiếm sang dạng không dấu
        const normalizedKeyword = removeVietnameseTones(name);

        // Tạo một mảng chứa các tên không dấu
        const normalizedNames = allProducts.map(product => removeVietnameseTones(product.name).toLowerCase());

        // Tìm kiếm sản phẩm với tên không dấu
        const matchedProducts = allProducts.filter((product, index) => normalizedNames[index].includes(normalizedKeyword));

        // Kiểm tra nếu không có sản phẩm nào được tìm thấy
        if (matchedProducts.length === 0) {
            return res.json({ data: [] });
        }

        // Thu thập danh sách các ID sản phẩm
        const productIds = matchedProducts.map(product => product._id);

        // Tìm kiếm và trả về các sản phẩm có ID tương ứng
        const finalProducts = await Product.findOne({ _id: { $in: productIds } });

        // for (let i = 0; i < finalProducts.length; i++) {
        const image = await getImageById(finalProducts.idsImage[0])// Tìm ảnh trong cơ sở dữ liệu
        finalProducts.firstImage = image; // Lấy trường image từ ảnh tìm được
        // }
        // const image = await getImageById(finalProducts.idsImage[0])// Tìm ảnh trong cơ sở dữ liệu
        // finalProducts.firstImage = image;
        res.json({
            data: finalProducts
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



function removeVietnameseTones(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
// Ví dụ sử dụng
[
    { 'name': 'con cò' },
    { 'name': 'con chó' }
]
const getAllProduct2 = async (req, res) => {
    try {


        const result = await ProductService.getAllProduct2()
        return res.status(200).json(result)

    } catch (e) {
        return res.status(404).json({

            message: e.message
        })
    }
}
module.exports = {
    search,
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteMany,
    getAllType,
    getType,
    getAllProduct2

}