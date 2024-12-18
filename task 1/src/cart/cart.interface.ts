import { Document } from "mongoose";
import { Users } from "../users/users.interface";
import { Products } from "../products/products.interface";

export interface Carts extends Document{
    items:CartItems[];
    totalPrice: number;
    totalPriceAfterDiscount: number;
    user:Users;
}


export interface CartItems{
    product:Products;
    quantity:number;
    price:number;

}