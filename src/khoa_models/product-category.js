
import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
});

export const ProductCategoryModel = mongoose.model("product-category", productCategorySchema);
