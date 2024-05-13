
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
    date: { type: String },
    idsComment: { type: [mongoose.Types.ObjectId], ref: "comment" },
    idsReaction: { type: [mongoose.Types.ObjectId], ref: "blog-reaction" } // api sử dụng $push, $pushAll, $
});

export const BlogModel = mongoose.model("blog", blogSchema);
