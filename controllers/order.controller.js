import { isValidObjectId } from "mongoose";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import { AppError } from "../utils/AppError.js";

export const getAllOrders = async (req, res) => {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1){
        throw new AppError("page and limit must be positive integers", 400, "validation-error");
    }

    const [orders, total] = await Promise.all([
        Order.find().skip((page - 1) * limit).limit(limit),
        Order.countDocuments(),
    ]);
    return res.json({data: orders, total});
};

export const getOrderById = async (req, res) => {
    const { id } = req.params;

    if(!isValidObjectId(id)){
        throw new AppError("order not found", 404, "not-found");
    }

    const order = await Order.findById(id)
        .populate('items._id', 'categories');

    if (!order) {
        throw new AppError("order not found", 404, "not-found");
    }

    return res.json(order);
};

export const addOrder = async(req, res) => {
    const itemsIds = req.body.items.map(({_id}) => _id.toLowerCase());

    const items = await Product.find({_id: {$in: itemsIds}});

    const itemsById = new Map(items.map((item) => [item.id.toLowerCase(), item]));

    if (itemsById.size !== new Set(itemsIds).size) {
        throw new AppError("one or more items were not found", 404, "not-found");
    }

    const orderItems = req.body.items.map(({_id, quantity}) => {
        const item = itemsById.get(_id.toLowerCase());
        return {
            _id: item._id,
            name: item.name,
            price: item.price,
            quantity
        };
    });

    const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const order = new Order({
        createdAt: req.body.createdAt ?? new Date(),
        address: req.body.address,
        items: orderItems,
        totalPrice
    });

    await order.save();

    return res.status(201).json(order);
};