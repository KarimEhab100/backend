import { body, param } from "express-validator";
import validatorMiddleware from "../middlewares/validator.middleware";
import subcategoriesSchema from "./subcategories.schema";
import categoriesSchema from "../categories/categories.schema";

class SubcategoriesValidation {
    createOne = [
        body('name')
        .notEmpty().withMessage((val,{req})=> req.__('validation_field'))
        .isLength({ min: 2 , max: 5 }).withMessage((val,{req})=> req.__('validation_length_short'))
        ,body('category').notEmpty().withMessage((val,{req})=> req.__('validation_field'))
        .isMongoId().withMessage((val,{req})=> req.__('invalid_id'))
        .custom(async(val:string)=>{
            const category = await categoriesSchema.findById(val);
            if(!category) throw new Error ("Cannot find category or it dosen't exist");
        })
        ,validatorMiddleware]
    updateOne = [
        param("id").isMongoId().withMessage((val,{req})=> req.__('invalid_id')),
        body('name').optional().isLength({ min: 2 , max: 5 }).withMessage((val,{req})=> req.__('validation_length_short')),
        body('category').optional()
        .isMongoId().withMessage((val,{req})=> req.__('invalid_id'))
        .custom(async(val:string)=>{
            const category = await categoriesSchema.findById(val);
            if(!category) throw new Error ("Cannot find category or it dosen't exist");
        })
    ,validatorMiddleware]
    getOne = [
        param("id").isMongoId().withMessage((val,{req})=> req.__('invalid_id')),
        validatorMiddleware]
    deleteOne = [
        param("id").isMongoId().withMessage((val,{req})=> req.__('invalid_id')),
        validatorMiddleware]
    

}

const subcategoriesValidation = new SubcategoriesValidation();
export default subcategoriesValidation;