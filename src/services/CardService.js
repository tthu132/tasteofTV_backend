const Card = require("../models/cardModel");
const Product = require('../models/ProductModel');
const Image = require('../models/product-image');


const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { user, amount, product } = newProduct;

        console.log('new product from service', newProduct);
        try {
            // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            const existingProduct = await Card.findOne({ user, product });
            if (existingProduct) {
                // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
                existingProduct.amount += amount;
                await existingProduct.save();
                console.log('Existing product updated:', existingProduct);
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: existingProduct
                });
            } else {
                // Nếu sản phẩm chưa có trong giỏ hàng, tạo sản phẩm mới trong giỏ hàng
                const newProduct = await Card.create({
                    user,


                    amount,
                    product,

                });
                console.log('New product created:', newProduct);
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newProduct
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateProduct = (user, product, newQuantity) => {

    console.log('a', user, product, newQuantity);
    return new Promise(async (resolve, reject) => {
        try {
            const updatedCartItem = await Card.findOneAndUpdate(
                { user, product },
                { amount: newQuantity },
                { new: true }
            );
            resolve({
                status: 'OK',
                message: 'SUCCESSs',
                data: updatedCartItem,

            })
        } catch (e) {

            reject(e);

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
        console.log('id ', id);
        try {
            const cartItems = await Card.find({ user: id });


            const cartDetails = [];

            // Duyệt qua từng mục trong giỏ hàng và lấy thông tin chi tiết của sản phẩm tương ứng
            for (const cartItem of cartItems) {
                // Lấy thông tin chi tiết của sản phẩm thông qua id sản phẩm từ mô hình Product
                const product = await Product.findById(cartItem.product);
                const image1 = await getImageById(product.idsImage[0])

                // console.log(image1);
                // Kiểm tra xem sản phẩm có tồn tại không trước khi thêm vào cartDetails
                if (product) {
                    cartDetails.push({
                        countInstock: product.countInStock,
                        product: cartItem.product,
                        amount: cartItem.amount,
                        image: image1, // Giả sử trường image chứa đường dẫn ảnh của sản phẩm
                        price: product.price,
                        name: product.name,// Giả sử trường price chứa giá của sản phẩm
                        discount: product.discount
                    });
                }

            }



            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: cartDetails
            })
        } catch (e) {
            reject(e)
        }
    })
}

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
            console.log('product typeeeeeeeeeeee ', products);
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
const deleteMany = (user, productList) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Xóa tất cả các sản phẩm trong danh sách productList của người dùng user
            await Card.deleteMany({ user: user, product: { $in: productList } });

            resolve({
                status: 'OK',
                message: 'Deleted products from cart successfully',
                data: null // Không cần trả về dữ liệu sau khi xóa
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteMany,
    getAllProduct,

    getAllType,
    getType
}