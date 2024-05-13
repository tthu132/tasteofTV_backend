const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        content: { type: String, required: true, },
        idUser: { type: mongoose.Types.ObjectId, ref: "User" },

        idBlog: { type: mongoose.Types.ObjectId, ref: "Blog" },
        idRep: { type: mongoose.Types.ObjectId, ref: "Comment" },


    },
    {
        timestamps: true,
    }
);
const Blog = require('./BlogModel');

// Middleware để thêm ID của comment vào model Blog khi tạo mới comment
// commentSchema.pre('save', async function (next) {
//     const comment = this;

//     try {
//         // Tìm blog mà comment được thêm vào
//         const blog = await Blog.findById(comment.idBlog);
//         if (!blog) {
//             throw new Error('Blog not found');
//         }

//         // Thêm ID của comment vào idsComment của blog
//         blog.idsComment.push(comment._id);

//         // Lưu trạng thái mới của blog
//         await blog.save();
//     } catch (error) {
//         // Xử lý lỗi nếu có
//         console.error('Error adding comment ID to blog:', error);
//         throw error; // Chuyển tiếp lỗi cho middleware tiếp theo (nếu có)
//     }

//     next();
// });
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;