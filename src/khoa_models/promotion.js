
import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
    name: { type: String },

    idsProduct: { type: [mongoose.Types.ObjectId], ref: "product" },
    active: { type: Boolean, default: true },
});

export const PromotionModel = mongoose.model("promotion", promotionSchema);
