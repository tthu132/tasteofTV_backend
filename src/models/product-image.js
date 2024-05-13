
const mongoose = require('mongoose')

const productImagerySchema = new mongoose.Schema(
    {
        image: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
const productImage = mongoose.model('product-image', productImagerySchema);

module.exports = productImage;