import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    username: {type: String, unique: true},
    password: String,
    address: String,
    phone: String,
    role: {type: String, enum: ['admin', 'user'], default: 'user'},
});

userSchema.pre(['save', /update/], async function(){
    if (!this.isModified('password'))
        return;
    const saltRounds = +process.env.SALT_ROUNDS ?? 12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
});

userSchema.methods.comparePassword = async function(password){
    console.log(this);
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function(){
    return jwt.sign(
        { id: this._id, role: this.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

const User = model('users', userSchema);

export default User;