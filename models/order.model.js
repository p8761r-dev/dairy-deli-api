import { model, Schema, SchemaTypes } from "mongoose";

const orderSchema = new Schema({
    createdAt: {type: Date, default: Date.now},
    status: {
        type: String,
        enum:['pending', 'in progress', 'completed'],
        default: 'pending'
    },
    totalPrice: Number,
    items: [{
        _id: {type: SchemaTypes.ObjectId, ref: 'products'},
        name: String,
        price: Number,
        quantity: Number
    }],
    address: {
        city: {type: String, required: true},
        street: String,
        num: Number
    }
})

const Order = model('orders', orderSchema);
export default Order;