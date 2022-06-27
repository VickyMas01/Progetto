import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [{
        type: Object,
        required: true
    }],
    taken: {
        type: String,
        default: "pending"
    },
    total: {
        type: Number,
    }
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);