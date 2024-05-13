const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        idsLike: { type: [mongoose.Types.ObjectId], ref: "User" },
        video: { type: String, required: true },
        idProduct: { type: mongoose.Types.ObjectId, ref: "Product" },
        product: { type: Object },

        idsComment: { type: [mongoose.Types.ObjectId], ref: "Comment" },

    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;