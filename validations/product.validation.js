import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string().lowercase().required(),
    price: Joi.number().positive(),
    isAvailable: Joi.boolean().default(true),
    description: Joi.string(),
    categories: Joi.array().items(Joi.string()),
    allergens: Joi.array().items(Joi.string())
});