import mongoose from "mongoose";
import { Products } from "./products.interface";


const productsSchema = new mongoose.Schema<Products>({
    name:{type: String, required: true , trim: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref:'Categories'},
    subcategory: {type: mongoose.Schema.Types.ObjectId, ref:'subcategories'},
    description:{type: String, required: true , trim: true},
    price: {type:Number,required: true },
    discount: {type:Number },
    priceAfterDiscount: {type:Number },
    quantity:{ type:Number, default: 0},
    sold: { type:Number, default: 0},
    rateAvg: { type:Number, default: 0},
    rating: { type:Number, default: 0},
    cover: {type:String},
    images:[String]
},
{
    timestamps: true
});

productsSchema.pre<Products>(/^find/, function(next){
    this.populate({path: 'subcategories',select:'name image'})
    next();
})


export default mongoose.model<Products>("products", productsSchema);
