import mongoose from "mongoose";
import { Products } from "./products.interface";
import subcategoriesSchema from "../subcategories/subcategories.schema";


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
{   toJSON:{virtuals:true},
    toObject:{virtuals:true},
    timestamps: true
});


const imagesUrl = (document: Products)=>{
    if(document.cover){
    document.cover = `${process.env.BASE_URL}/images/products/${document.cover}`;
    }
    if(document.images){
        document.images = document.images.map((image: string) =>
            `${process.env.BASE_URL}/images/products/${image}`);
}
}
productsSchema.post('init',imagesUrl).post('save',imagesUrl)

productsSchema.pre<Products>(/^find/, function(next){
    this.populate({path:'subcategory',select:'name image'})
    next();
})

productsSchema.virtual('reviews'/**Field Name */,
    {   localField:'_id',
        foreignField:'product',
        ref: 'reviews'/**reviewsSchema */
    })

export default mongoose.model<Products>("products", productsSchema);
