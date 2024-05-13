
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    description: { type: String },
    idProductCate: { type: mongoose.Types.ObjectId, ref: "product-category" },
    idsImage: { type: [mongoose.Types.ObjectId], ref: "product-image" },
    countInStock: { type: Number }
});

export const ProductModel = mongoose.model("product", productSchema);
