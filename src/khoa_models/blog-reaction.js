
import mongoose from "mongoose";

const blogReactionSchema = new mongoose.Schema({
    idBlog: { type: mongoose.Types.ObjectId, ref: "blog" },
    idUser: { type: mongoose.Types.ObjectId, ref: "user" },
});

// reaction: ""

export const BlogReactionModel = mongoose.model("blog-reaction", blogReactionSchema);
