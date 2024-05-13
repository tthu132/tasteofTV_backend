
import mongoose from "mongoose";

const customerInfoSchema = new mongoose.Schema({
    address: { type: String },
});

export const CustomerInfoModel = mongoose.model("customer-info", customerInfoSchema);
