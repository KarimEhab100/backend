import mongoose from "mongoose";
import {Copons} from "./copons.interface";

const coponsSchema = new mongoose.Schema<Copons>({
    name: {type: String},
    discount: {type: Number},
    expireTime: {type: Date},
}, {timestamps: true});

export default mongoose.model<Copons>('copons', coponsSchema);