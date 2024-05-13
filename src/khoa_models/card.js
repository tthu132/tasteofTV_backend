
import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    idCustomer: { type: mongoose.Types.ObjectId, ref: "customer" },
    idProduct: { type: mongoose.Types.ObjectId, ref: "product" },
    count: { type: Number },
});

export const CardModel = mongoose.model("card", cardSchema);
