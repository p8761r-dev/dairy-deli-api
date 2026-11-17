import Joi from "joi";

export const orderSchema = Joi.object({
    createdAt: Joi.date(),
    status: Joi.string().valid('pending', 'in progress', 'completed'),
    totalPrice: Joi.number(),
    address: Joi.object({
        city: Joi.string().required(),
        street: Joi.string(),
        num: Joi.number()
    }).required(),
    items: Joi.array().items(
        Joi.object({
            _id: Joi.string().hex().length(24).required(),
            name: Joi.string(),
            price: Joi.number(),
            quantity: Joi.number().integer().positive().required(),
        })
    ).min(1).required(),
});