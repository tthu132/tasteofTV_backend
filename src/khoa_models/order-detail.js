
import mongoose from "mongoose";

const orderDetailSchema = new mongoose.Schema({
    idOrder: { type: mongoose.Types.ObjectId, ref: "order" },
    idProduct: { type: mongoose.Types.ObjectId, ref: "product" },
    count: { type: Number },
    price: { type: Number },
});

export const OrderDetailModel = mongoose.model("order-detail", orderDetailSchema);
