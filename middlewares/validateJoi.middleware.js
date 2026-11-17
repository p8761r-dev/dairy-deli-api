import { AppError } from "../utils/AppError.js";

export const validateBody = (Schema) => {
    const mdl = (req, res, next) => {
        const { error, value } = Schema.validate(req.body)
        if (error) {
            throw new AppError(error.message, 409, 'validation-error')
        } else {
            req.body = value;
            next();
        }
    };
    return mdl;
};