
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    date: { type: String },
    idCustomer: { type: mongoose.Types.ObjectId, ref: "customer" },
    idsOrderDetail: { type: [mongoose.Types.ObjectId], ref: "order-detail" },
    payment: { type: String }, // ttknh
    status: { type: String }
});


// thanh toán khi nhận hàng

const paymentDefault = [{ "id": "ttkhn", name: "Thanh toán khi nhận hàng" }];
const statusDefault = [{ "id": "dtt", name: "Đã thanh toán" }, { "id": "ddh", name: "Đã đặt hàng" }];

export const OrderModel = mongoose.model("order", orderSchema);
