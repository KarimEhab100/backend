import { body, param } from "express-validator";
import categoriesSchema from "./categories.schema";
import validatorMiddleware from "../middlewares/validator.middleware";

class CategoriesValidation {
    createOne = [body('name').notEmpty().withMessage((val,{req})=> req.__('validation_field'))
        .isLength({ min: 2 , max: 20 }).withMessage((val,{req})=> req.__('validation_length_short'))
        .custom(async(val:string,{req})=>{
        const category = await categoriesSchema.findOne({ name: val});
        if (category) throw new Error(`${req.__('not_found')}`)
            return true;
    })
    ,validatorMiddleware]
    updateOne = [
        param("id").isMongoId().withMessage((val,{req})=> req.__('invalid_id')),
        body('name').optional()
        .isLength({ min: 2 , max: 20 }).withMessage((val,{req})=> req.__('validation_length_short'))
        .custom(async(val:string ,{req})=>{
        const category = await categoriesSchema.findOne({ name: val});
        if (category && category._id!.toString() !== req.params?.id.toString()) throw new Error("category is already in use")
            return true;
    })
    ,validatorMiddleware]
    getOne = [
        param("id").isMongoId().withMessage((val,{req})=> req.__('invalid_id')),
        validatorMiddleware]
    deleteOne = [
        param("id").isMongoId().withMessage((val,{req})=> req.__('invalid_id')),
        validatorMiddleware]
    

}

const categoriesValidation = new CategoriesValidation();
export default categoriesValidation;