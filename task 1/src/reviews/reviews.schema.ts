import express from "express";
import mongoose, { Mongoose } from "mongoose";
import { Reviews } from "./reviews.interface";
import { console } from "inspector";
import productsSchema from "../products/products.schema";


const reviewsSchema = new mongoose.Schema<Reviews>({
    comment:{type: String},
    rate:{type: Number},
    user: {type: mongoose.Schema.Types.ObjectId , ref:"users"},
    product: {type: mongoose.Schema.Types.ObjectId , ref:"products"}
},{timestamps: true});

reviewsSchema.pre<Reviews>(/^find/, function (next){
    this.populate({path:'user', select:'name image'});
    next();
})

reviewsSchema.statics.calcRating = async function(productId){
    const result  = await this.aggregate([
        {$match:{product:productId}},
        {$group : {
                    _id:'product',
                    avgRating:{$avg:'$rate'},
                    ratingQuantity:{$sum:1}}}/** كإني عامل كاونتر كل ما يجيب برودكت يزود واحد*/
                ]);
    if(result.length > 0){
        await productsSchema.findByIdAndUpdate(productId, {
            rateAvg: result[0].avgRating,
            rating: result[0].ratingQuantity
        })
    }else{
        await productsSchema.findByIdAndUpdate(productId, {
            rateAvg: 0,
            rating: 0
        })
    };
}
reviewsSchema.post<Reviews>('save', async function(){
    await (this.constructor as any).calcRating(this.product)
    ;
})
reviewsSchema.post<Reviews>('findOneAndUpdate', async function(doc:Reviews){
    await (doc.constructor as any).calcRating(doc.product)
})
reviewsSchema.post<Reviews>('findOneAndDelete', async function(doc:Reviews){
    await (doc.constructor as any).calcRating(doc.product)
})
export default mongoose.model<Reviews>("reviews", reviewsSchema);