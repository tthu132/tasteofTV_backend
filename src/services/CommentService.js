const Comment = require("../models/CommentModel")
const Blog = require("../models/BlogModel")

const Product1 = require("../models/ProductModel");
const Image = require('../models/product-image');

const User = require('../models/UserModel');


const createBlog = async (newProductData) => {
    try {
        const { content, idUser, idBlog, idRep } = newProductData;
        console.log('server', newProductData);

        try {
            const newProduct = await Comment.create({
                content: content,
                idUser: idUser,
                idBlog: idBlog,
                idRep: idRep || null
            });

            const updatedBlog = await Blog.findByIdAndUpdate(idBlog, { $push: { idsComment: newProduct._id } }, { new: true });

            // Lấy thông tin người dùng từ model User
            const user = await User.findById(idUser);

            // Trả về thông tin bình luận kèm theo thông tin người dùng
            return {
                status: 'OK',
                message: 'SUCCESS',
                data: {
                    ...newProduct.toJSON(), // Chuyển đổi đối tượng newProduct thành JSON
                    user: {
                        name: user.name,
                        avatar: user.avatar,
                        id: user._id
                    },
                    timestamp: newProduct.createdAt

                }
            };
        } catch (error) {
            return {
                status: 'ERR',
                message: `Failed to create product with image data: ${content}`,
                error: error.message
            };
        }
    } catch (error) {
        throw new Error(`Failed to create products: ${error.message}`);
    }
};



const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('id ne n1 ', id);

            const checkProduct = await Comment.findOne({
                _id: id
            })
            console.log('check product    ', checkProduct);
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            const updatedProduct = await Comment.findByIdAndUpdate(id, data, { new: true })


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
            const checkProduct = await Comment.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            await Comment.findByIdAndDelete(id)
            await Blog.updateMany({}, { $pull: { idsComment: id } });
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
const getAllCommentsForBlog = async (idBlog) => {
    try {
        // Tìm bài viết dựa trên idBlog
        const blog = await Blog.findById(idBlog);

        if (!blog) {
            return {
                status: 'ERR',
                message: 'Blog not found'
            };
        }

        // Lấy ra danh sách ids của tất cả các comment liên quan đến bài viết
        const commentIds = blog.idsComment;

        // Truy vấn tất cả các comment sử dụng danh sách ids đã thu được
        const comments = await Comment.find({ _id: { $in: commentIds } });

        // Tạo một mảng chứa thông tin của mỗi comment cùng với thông tin người dùng
        const commentsWithUserInfo = await Promise.all(comments.map(async (comment) => {
            // Tìm thông tin người dùng dựa trên idUser
            const user = await User.findById(comment.idUser);

            return {
                _id: comment._id,
                content: comment.content,
                user: {
                    name: user.name,
                    avatar: user.avatar
                }
            };
        }));

        return {
            status: 'OK',
            message: 'SUCCESS',
            data: commentsWithUserInfo
        };
    } catch (error) {
        return {
            status: 'ERR',
            message: `Failed to get comments for blog with user info: ${error.message}`,
            error: error.message
        };
    }
};
const getCommentsForBlogWithReplies = async (idBlog) => {
    try {
        const blog = await Blog.findById(idBlog);

        if (!blog) {
            return {
                status: 'ERR',
                message: 'Blog not found'
            };
        }

        const commentIds = blog.idsComment;
        const comments = await Comment.find({ _id: { $in: commentIds } }).sort({ updatedAt: -1 });;

        const mainComments = [];
        const commentsMap = {};

        // Lặp qua tất cả các bình luận để phân loại chúng và lấy thông tin người dùng
        for (const comment of comments) {
            // Truy vấn thông tin người dùng từ model User dựa trên idUser của mỗi bình luận
            const user = await User.findById(comment.idUser);

            // Kiểm tra xem đây có phải là bình luận chính không
            if (!comment.idRep) {
                const mainCommentData = {
                    timestamp: comment.updatedAt,
                    _id: comment._id,
                    content: comment.content,
                    user: {
                        name: user.name,
                        avatar: user.avatar,
                        id: user._id
                    },

                };
                mainComments.push(mainCommentData);
            } else {
                // Nếu không, đây là bình luận trả lời
                const parentCommentId = comment.idRep.toString();
                if (!commentsMap[parentCommentId]) {
                    commentsMap[parentCommentId] = [];
                }
                const replyCommentData = {
                    _id: comment._id,
                    content: comment.content,
                    user: {
                        name: user.name,
                        avatar: user.avatar
                    },
                    timestamp: comment.updatedAt
                };
                commentsMap[parentCommentId].push(replyCommentData);
            }
        }

        // Kết hợp bình luận trả lời vào bình luận chính tương ứng
        mainComments.forEach(mainComment => {
            const mainCommentId = mainComment._id.toString();
            if (commentsMap[mainCommentId]) {
                mainComment.replies = commentsMap[mainCommentId];
            }
        });

        return {
            status: 'OK',
            message: 'SUCCESS',
            data: mainComments
        };
    } catch (error) {
        return {
            status: 'ERR',
            message: `Failed to get comments for blog with replies and user info: ${error.message}`,
            error: error.message
        };
    }
};

module.exports = {
    createBlog,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    getAllCommentsForBlog,
    getAllType,
    getCommentsForBlogWithReplies
}