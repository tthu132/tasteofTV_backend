const Product = require("../models/BlogModel")
const Product1 = require("../models/ProductModel");
const Image = require('../models/product-image');


const createBlog = async (newProductData) => {
    try {
        const { title, video, idProduct } = newProductData;
        console.log('server', newProductData);


        try {
            const newProduct = await Product.create({
                title: title,
                video: video,
                idProduct: idProduct
            });

            return {
                status: 'OK',
                message: 'SUCCESS',
                data: newProduct
            };
        } catch (error) {
            return {
                status: 'ERR',
                message: `Failed to create product with image data: ${imageData}`,
                error: error.message
            };
        }


        return createdProducts;
    } catch (error) {
        throw new Error(`Failed to create products: ${error.message}`);
    }
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('id ne n1 ', id);


            const checkProduct = await Product.findOne({
                _id: id
            })
            console.log('check product    ', checkProduct);
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })


            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedProduct,
                // payload: data, // Dữ liệu mới đã cập nhật
                // preview: updatedProduct // Dữ liệu mới đã cập nhật
            })
        } catch (e) {
            console.log('id neee 3 ', id);


            reject(e.message);

        }
    })
}


const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(id);
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
            const data = [];
            const product2 = await Product1.findById(product.idProduct);
            const image1 = await getImageById(product2.idsImage[0])
            if (product2) {
                data.push({
                    blog: product,
                    product: product2,

                    imageProduct: image1, // Giả sử trường image chứa đường dẫn ảnh của sản phẩm


                });
            }
            product.image = product2.name
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: product,
                productName: product2.name

            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllProduct = (limit, page, sort, filter) => {
    console.log('checkkkkk');
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
                const product2 = await Product1.findById(allProduct[i].idProduct);

                allProduct[i].product = product2;
                const image = await getImageById(product2.idsImage[0])// Tìm ảnh trong cơ sở dữ liệu

                allProduct[i].product.firstImage = image
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

module.exports = {
    createBlog,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType
}