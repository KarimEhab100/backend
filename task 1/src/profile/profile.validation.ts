import { body, param } from "express-validator";
import validatorMiddleware from "../middlewares/validator.middleware";
import bcrypt from "bcrypt"

class ProfileValidation {

    updateOne = [
        body('name').optional()
            .isLength({ min: 2 , max: 50 }).withMessage((val,{req})=> req.__('validation_length_short'))
        ,validatorMiddleware]
    getOne = [
        param("id").isMongoId().withMessage((val,{req})=> req.__('invalid_id')),
        validatorMiddleware]
    deleteOne = [
        param("id").isMongoId().withMessage((val,{req})=> req.__('invalid_id')),
        validatorMiddleware]
    changePassword = [
        body('currentPassword').notEmpty().withMessage((val,{req})=> req.__('validation_field'))
            .isLength({ min: 6 , max: 20 }).withMessage((val,{req})=> req.__('validation_length_password'))
            .custom(async(val,{req})=>{
                const isValidPassword = await bcrypt.compare(val,req.user.password);
                if (!isValidPassword) throw new Error(`${req.__('validation_value')}`)
            }),
        body('password').notEmpty().withMessage((val,{req})=> req.__('validation_field'))
        .isLength({ min: 6 , max: 20 }).withMessage((val,{req})=> req.__('validation_length_password')),
        body('confirmPassword').notEmpty().withMessage((val,{req})=> req.__('validation_field'))
        .isLength({ min: 6 , max: 20 }).withMessage((val,{req})=> req.__('validation_length_password'))
        .custom((val,{req})=>{
        if (val !== req.body.password) throw new Error(`${req.__('validation_password_match')}`)
        return true})
            ,validatorMiddleware]
    createPassword = [
            body('passoword').notEmpty().withMessage((val,{req})=> req.__('validation_field'))
            .isLength({ min: 6 , max: 20 }).withMessage((val,{req})=> req.__('validation_length_password')),
        
            body('confirmPassoword').notEmpty().withMessage((val,{req})=> req.__('validation_field'))
            .isLength({ min: 6 , max: 20 }).withMessage((val,{req})=> req.__('validation_length_password'))
            .custom((val,{req})=>{
            if (val !== req.body.password) throw new Error(`${req.__('validation_password_match')}`)
            })
            ,validatorMiddleware]

}

const profileValidation = new ProfileValidation();
export default profileValidation;