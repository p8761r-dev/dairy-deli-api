import { model, Schema } from "mongoose";

const productSchema = new Schema({
    name: String,
    price: Number,
    isAvailable: Boolean,
    description: String,
    allergens: [String],
    categories: [String]
});

const Product = model('products', productSchema);

export default Product