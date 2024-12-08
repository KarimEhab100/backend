import { Document } from "mongoose";
import { Categories } from "../categories/categories.interface";
import { Subcategories } from "../subcategories/subcategories.interface";


export interface Products extends Document{
    readonly name: string;
    readonly category: Categories;
    readonly subcategory: Subcategories;
    readonly description: string;
    readonly price: number;
    readonly discount: number;
    readonly priceAfterDiscount: number;
    readonly quantity: number;
    readonly sold: number;
    readonly rateAvg: number;
    readonly rating: number;
    cover: string;
    images: string[];
}