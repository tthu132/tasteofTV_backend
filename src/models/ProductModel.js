const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        firstImage: { type: String },
        categoryName: { type: String },
        idsImage: { type: [mongoose.Types.ObjectId], ref: "product-image" },
        // type: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number, },
        description: { type: String },
        discount: { type: Number },
        selled: { type: Number, default: 0 },
        donvi: { type: String },


        exp: { type: String },

        idProductCategory: { type: mongoose.Types.ObjectId, ref: "ProductCategory" }
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;