
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: { type: String },
    idUser: { type: mongoose.Types.ObjectId, ref: "user" },
    email: { type: String },
    idsCustomerInfo: {type: [mongoose.Types.ObjectId], ref: "
    import mongoose from "mongoose";
    
    const customerSchema = new mongoose.Schema({
        name: { type: String },
        idUser: { type: mongoose.Types.ObjectId, ref: "user" },
        email: { type: String },
    });
    
    export const CustomerModel = mongoose.model("customer", customerSchema);
    "}
});

export const CustomerModel = mongoose.model("customer", customerSchema);
