import { body, param } from "express-validator";
import cartsSchema from "./cart.schema";
import validatorMiddleware from "../middlewares/validator.middleware";

class CartsValidation {
    addToCart = [
        body('product')
        .notEmpty().withMessage((val,{req})=> req.__('validation_field'))
        .isMongoId().withMessage((val,{req})=> req.__('invalid_id'))
        ,validatorMiddleware]
    updateQuqntity = [
        param("itemId")
        .isMongoId().withMessage((val,{req})=> req.__('invalid_id')),
        body("quantity")
        .notEmpty().withMessage((val,{req})=> req.__('invalid_quantity'))
        .isInt({min:1}).withMessage((val,{req})=> req.__('invalid_number'))
    ,validatorMiddleware]
    removeFromCart= [
        param("itemId").isMongoId().withMessage((val,{req})=> req.__('invalid_id'))
        ,validatorMiddleware]



}

const cartsValidation = new CartsValidation();
export default cartsValidation;