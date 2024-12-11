import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {Users} from "./users.interface";

const usersSchema = new mongoose.Schema<Users>({
    username: {type: String},
    email: {type: String},
    name: {type: String},
    active: {type: Boolean, default: true},
    password: {type: String},
    googleId: String,
    hasPassword: {type: Boolean, default: true},
    image: {type: String, default: 'user-default.jpg'},
    role: {type: String, enum:['admin', 'employee', 'user'], default: 'user'},
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetCodeExpires: Date,
    passwordResetCodeVerify: Boolean
}, {timestamps: true});

const imagesUrl = (document: Users) => {
    if (document.image && document.image.startsWith('user')) document.image = `${process.env.BASE_URL}/images/users/${document.image}`;
};

usersSchema
    .post('init', imagesUrl)
    .post('save', imagesUrl);

usersSchema.pre<Users>('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 13);
    next();
});

export default mongoose.model<Users>('users', usersSchema);