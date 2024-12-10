import { body, param } from "express-validator";
import validatorMiddleware from "../middlewares/validator.middleware";
import categoriesSchema from "../categories/categories.schema";
import subcategoriesSchema from "../subcategories/subcategories.schema";

class ProductsValidation {
    createOne = [
        body('name')
        .notEmpty().withMessage((val,{req})=> req.__('validation_field'))
        .isLength({ min: 2 , max: 5 }).withMessage((val,{req})=> req.__('validation_length_short'))
        ,body('category').notEmpty().withMessage((val,{req})=> req.__('validation_field'))
        ////////////////////////////////////////////////////////
        ,body('description')
        .notEmpty().withMessage((val,{req})=> req.__('validation_field'))
        .isLength({ min: 2 , max: 500 }).withMessage((val,{req})=> req.__('validation_length_short'))
        ,body('category').notEmpty().withMessage((val,{req})=> req.__('validation_field'))
        /////////////////////////////////////////////////////////////////
        ,body('price')
        .notEmpty().withMessage((val,{req})=> req.__('validation_field'))
        .isFloat({ min: 1 , max: 10000000 }).withMessage((val,{req})=> req.__('validation_value'))
        /////////////////////////////////////////////////////////////////
        ,body('quantity')
        .optional()
        .isInt({ min: 1 , max: 10000000 }).withMessage((val,{req})=> req.__('validation_value'))
        /////////////////////////////////////////////////////////////////
        ,body('discount')
        .optional()
        .isFloat({ min: 1 , max: 100 }).withMessage((val,{req})=> req.__('validation_value'))
        .custom((val,{req})=>{
            req.body.priceAfterDiscount = req.body.price -(req.body.price * req.body.discount /100)
            return true;
        })
        ////////////////////////////////////////////////////////////////
        ,body('category').notEmpty().withMessage((val,{req})=> req.__('validation_field'))
        .isMongoId().withMessage((val,{req})=> req.__('invalid_id'))
        .custom(async(val:string)=>{
            const category = await categoriesSchema.findById(val);
            if(!category) throw new Error ("Cannot find category or it dosen't exist");
        })
        ////////////////////////////////////////////////////////////////    
        ,body('subcategory').notEmpty().withMessage((val,{req})=> req.__('validation_field'))
        .isMongoId().withMessage((val,{req})=> req.__('invalid_id'))
        .custom(async(val:string,{req})=>{
            const subcategory = await subcategoriesSchema.findById(val);
            if(!subcategory) throw new Error ("Cannot find subcategory or it dosen't exist");
            if(subcategory.category._id!.toString() !== req.body.category.toString()) throw new Error ("subcategory dosen't belong to category");
            return true
        })
        /////////////////////////////////////////////////////////////////////////////
        ,validatorMiddleware]
    updateOne = [
        param("id").isMongoId().withMessage((val,{req})=> req.__('invalid_id')),
        body('name').optional().isLength({ min: 2 , max: 5 }).withMessage((val,{req})=> req.__('validation_length_short'))
        ,body('category').notEmpty().withMessage((val,{req})=> req.__('validation_field'))
        ////////////////////////////////////////////////////////
        ,body('description').optional()
        .isLength({ min: 2 , max: 500 }).withMessage((val,{req})=> req.__('validation_length_short'))
        ,body('category').notEmpty().withMessage((val,{req})=> req.__('validation_field'))
        /////////////////////////////////////////////////////////////////
        ,body('price').optional()
        .isFloat({ min: 1 , max: 10000000 }).withMessage((val,{req})=> req.__('validation_value'))
        /////////////////////////////////////////////////////////////////
        ,body('quantity')
        .optional()
        .isInt({ min: 1 , max: 10000000 }).withMessage((val,{req})=> req.__('validation_value'))
        /////////////////////////////////////////////////////////////////
        ,body('discount')
        .optional()
        .isFloat({ min: 1 , max: 100 }).withMessage((val,{req})=> req.__('validation_value'))
        .custom((val,{req})=>{
            req.body.priceAfterDiscount = req.body.price -(req.body.price * req.body.discount /100)
            return true;
        })
        ////////////////////////////////////////////////////////////////
        ,body('category').optional()
        .isMongoId().withMessage((val,{req})=> req.__('invalid_id'))
        .custom(async(val:string)=>{
            const category = await categoriesSchema.findById(val);
            if(!category) throw new Error ("Cannot find category or it dosen't exist");
        })
        ////////////////////////////////////////////////////////////////    
        ,body('subcategory').optional()
        .isMongoId().withMessage((val,{req})=> req.__('invalid_id'))
        .custom(async(val:string,{req})=>{
            const subcategory = await subcategoriesSchema.findById(val);
            if(!subcategory) throw new Error ("Cannot find subcategory or it dosen't exist");
            if(subcategory.category._id!.toString() !== req.body.category.toString()) throw new Error ("subcategory dosen't belong to category");
            //if(categoriesSchema.findById(subcategory.category._id) === null) throw new Error ("subcategory should belong to the samecategory");
            const category = await categoriesSchema.findById(subcategory.category._id);
            if (!category)throw new Error("Subcategory should belong to a valid category");
            return true
        })
    
        /////////////////////////////////////////////////////////////////////////////
    ,validatorMiddleware]
    getOne = [
        param("id").isMongoId().withMessage((val,{req})=> req.__('invalid_id')),
        validatorMiddleware];
    deleteOne = [
        param("id").isMongoId().withMessage((val,{req})=> req.__('invalid_id')),
        validatorMiddleware];
    

}

const productsValidation = new ProductsValidation();
export default productsValidation;