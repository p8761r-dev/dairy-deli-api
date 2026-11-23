import User from "../models/user.model.js";
import { AppError } from '../utils/AppError.js'

export const register = async (req, res, next) => {
    const user = new User(req.body);
    await user.save();
    const token = user.generateToken();
    res.status(201).json({user, token});
};

export const login = async(req, res, next) => {
    const user = await User.findOne(
        {username: req.body.username });

    if (!user)
        throw new AppError('invalid username or password', 404);

    const result = await user.comparePassword(req.body.password);
    if (!result)
        throw new AppError('invalid username or password', 404);

    const token = user.generateToken();
    res.json({user, token});
};

export const updatePassword = (req, res, next) => {};