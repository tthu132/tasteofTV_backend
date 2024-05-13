
const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema(
    {
        // image: { type: String, required: true },
        amount: { type: Number, required: true },
        // name: { type: String, required: true },
        // price: { type: String, required: true },
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        // countInstock: { type: String, required: true },
        // discount: { type: Number, required: true },
        user: { type: mongoose.Types.ObjectId, ref: "User" },
    },
    {
        timestamps: true,
    }
);
const card = mongoose.model('card', cardSchema);

module.exports = card;