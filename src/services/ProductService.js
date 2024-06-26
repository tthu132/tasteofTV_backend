const Product = require("../models/ProductModel");
const Image = require('../models/product-image');
const ProductCategory = require("../models/ProductCategoryModel")

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, countInStock, price, rating, description, idProductCategory, idsImage, discount, donvi, exp, selled } = newProduct;

        try {
            const checkProduct = await Product.findOne({ name: name });
            if (checkProduct !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of product is already'
                });
            }

            // Chuyển đổi idsImage thành mảng nếu nó không phải là mảng
            const uploadedImageIds = Array.isArray(idsImage) ? idsImage : [idsImage];


            // Lặp qua mỗi ID ảnh và lưu vào cơ sở dữ liệu
            const foundImages = await Image.find({ _id: { $in: uploadedImageIds } });
            const validImageIds = foundImages.map(image => image._id);

            const newProduct = await Product.create({
                name,
                discount,
                donvi,
                countInStock: Number(countInStock),
                price,
                rating,
                description,
                idProductCategory,
                idsImage: validImageIds, // Lưu mảng các ID ảnh
                exp, selled
            });

            if (newProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newProduct
                });
            }
        } catch (e) {
            reject(e.message);
        }
    });
};

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })


            resolve({
                status: 'OK',
                message: 'SUCCESSs',
                data: updatedProduct,
                payload: data, // Dữ liệu mới đã cập nhật
                preview: updatedProduct // Dữ liệu mới đã cập nhật
            })
        } catch (e) {

            reject(e.message);

        }
    })
}


const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }
            const image = await getImageById(product.idsImage[0])// Tìm ảnh trong cơ sở dữ liệu
            product.firstImage = image;
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
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


const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()
            let allProduct = []
            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Product.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit).sort({ createdAt: -1, updatedAt: -1 })
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort).sort({ createdAt: -1, updatedAt: -1 })
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (!limit) {
                allProduct = await Product.find().sort({ createdAt: -1, updatedAt: -1 })
            } else {
                allProduct = await Product.find().limit(limit).skip(page * limit).sort({ createdAt: -1, updatedAt: -1 })
            }
            for (let i = 0; i < allProduct.length; i++) {
                const firstImageId = allProduct[i].idsImage[0]; // Lấy id ảnh đầu tiên
                const image = await getImageById(allProduct[i].idsImage[0])// Tìm ảnh trong cơ sở dữ liệu
                allProduct[i].firstImage = image; // Lấy trường image từ ảnh tìm được
            }
            for (let i = 0; i < allProduct.length; i++) {
                const product = allProduct[i];
                const productCategory = await ProductCategory.findById(product.idProductCategory);
                if (productCategory) {
                    product.categoryName = productCategory.name;
                }
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (e) {
            reject(e.message)
        }
    })
}

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'Success',
                data: allType,
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getType = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await Product.find({ idProductCategory: id });
            resolve({
                status: 'OK',
                message: 'get type product success',
                data: products
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllProduct2 = () => {
    return new Promise(async (resolve, reject) => {

        try {

            const data = await Product.find()

            // for (let i = 0; i < data.length; i++) {
            //     const firstImageId = data[i].idsImage[0]; // Lấy id ảnh đầu tiên
            //     const image = await getImageById(data[i].idsImage[0])// Tìm ảnh trong cơ sở dữ liệu
            //     data[i].firstImage = image; // Lấy trường image từ ảnh tìm được
            // }
            for (let i = 0; i < data.length; i++) {
                const product = data[i];
                const productCategory = await ProductCategory.findById(product.idProductCategory);
                if (productCategory) {
                    product.categoryName = productCategory.name;
                }
            }

            resolve({
                status: 'OK',
                message: 'delete user SUCCESS',
                data
            })

        } catch (e) {
            console.log(e.message);
            reject(e)
        }
    })
}
module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType,
    getType,
    getAllProduct2
}