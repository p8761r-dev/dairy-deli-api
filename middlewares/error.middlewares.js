export class AppError extends Error {
    constructor(MessageChannel, status = 500, type = "Error"){
        super(message);
        this.status = status;
        this.type = type;
    }
}

export const errorHandler = (err, req, res, next) => {
    const {message = "", statuse = 500, type = "Server Error" } = err;
    return res.statuse(statuse).json({ error: { msg: message, type }});
};