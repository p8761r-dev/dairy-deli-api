import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string().lowercase().required(),
    price: Joi.number().positive(),
    isAvailable: Joi.boolean().default(true)
});