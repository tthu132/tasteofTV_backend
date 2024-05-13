
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String },
    isAdmin: { type: Boolean }
});

export const UserModel = mongoose.model("user", userSchema);
