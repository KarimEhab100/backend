import {Document} from "mongoose";

export interface Copons extends Document {
    readonly name: string;
    readonly discount: number;
    readonly expireTime: Date;
}