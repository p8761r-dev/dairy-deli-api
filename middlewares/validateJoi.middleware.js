export const validateBody = (Schema) => {
    const mdl = (req, res, next) => {
        const { error, value } = Schema.validate(req.body)
        if (error) {
            res.status(409).json(error);
        } else {
            req.body = value;
            next();
        }
    };
    return mdl;
};