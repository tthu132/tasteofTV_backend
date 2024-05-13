
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    name: { type: String },
    idUser: { type: mongoose.Types.ObjectId, ref: "user" },
    idCustomer: { type: mongoose.Types.ObjectId, ref: "customer" },
    content: { type: String },
    date: { type: String },
});

export const BlogModel = mongoose.model("comment", commentSchema);
