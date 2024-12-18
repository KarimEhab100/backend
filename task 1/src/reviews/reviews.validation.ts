import { body, param } from "express-validator";
import reviewsSchema from "./reviews.schema";
import validatorMiddleware from "../middlewares/validator.middleware";

class ReviewsValidation {
    createOne = [
        body('comment')
        .notEmpty().withMessage((val,{req})=> req.__('validation_field'))
        .isLength({ min: 2 , max: 150 }).withMessage((val,{req})=> req.__('validation_length_medium')),
        body('rate')
        .notEmpty().withMessage((val,{req})=> req.__('validation_field'))
        .isFloat({ min: 1 , max: 5 }).withMessage((val,{req})=> req.__('validation_value')),
        body('user')
        .notEmpty().withMessage((val,{req})=> req.__('validation_field'))
        .isMongoId().withMessage((val,{req})=> req.__('invalid_id')),
        body('product')
        .notEmpty().withMessage((val,{req})=> req.__('validation_field'))
        .isMongoId().withMessage((val,{req})=> req.__('invalid_id'))
        // .custom(async(val,{req})=>{
        //     const review = await reviewsSchema.findOne({user:req.user._id,product:val})
        //     if(review) throw new Error(`you can't review a product twice`)
        //     return true;
        // })
    ,validatorMiddleware]
    updateOne = [
        param("id")
        .isMongoId().withMessage((val,{req})=> req.__('invalid_id'))
        .custom((async(val,{req})=>{
            const review = await reviewsSchema.findById(val)
            if(review?.user._id!.toString() !== req.user._id.toString()) throw new Error(`you can't edit this review`)
                return true;
            })),
        body('comment')
        .optional()
        .isLength({ min: 2 , max: 150 }).withMessage((val,{req})=> req.__('validation_length_medium')),
        body('rate')
        .optional()
        .isFloat({ min: 1 , max: 5 }).withMessage((val,{req})=> req.__('validation_value'))
    ,validatorMiddleware]
    getOne = [
        param("id").isMongoId().withMessage((val,{req})=> req.__('invalid_id')),
        validatorMiddleware]
    deleteOne = [
        param("id").isMongoId().withMessage((val,{req})=> req.__('invalid_id'))
        .custom((async(val,{req})=>{
            if(req.user.role === 'user'/**or (!(['admin' ,'employee'].includes(req.user.role))) */){
            const review = await reviewsSchema.findById(val)
            if(review?.user._id!.toString() !== req.user._id.toString()) throw new Error(`you can't delete this review`)
            }
            return true;
            })),
        validatorMiddleware]
    

}

const reviewsValidation = new ReviewsValidation();
export default reviewsValidation;