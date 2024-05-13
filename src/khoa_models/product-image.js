
import mongoose from "mongoose";

const productImagerySchema = new mongoose.Schema({
    imageBase64: { type: String, required: true }
});

export const ProductImageModel = mongoose.model("product-image", productImagerySchema);
