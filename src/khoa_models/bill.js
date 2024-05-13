
import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
    idOrder: { type: mongoose.Types.ObjectId, ref: "order" },
    date: { type: String },
    money: { type: Number },
});

export const BillModel = mongoose.model("bill", billSchema);
