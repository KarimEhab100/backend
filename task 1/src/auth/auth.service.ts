import {NextFunction, Request, Response} from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usersSchema from "../users/users.schema";
import ApiErrors from "../utils/apiError";
import createTokens from "../utils/tokens";
import sanitization from "../utils/sanitization";
import sendMail from "../utils/sendMail";
import crypto from "crypto";
class AuthService {

    signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = await usersSchema.create({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email, 
            image: req.body.image
        });
        const token = createTokens.accessToken(user._id, user.role);
        res.status(201).json({token, data: sanitization.User(user)});
    });

    login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = await usersSchema.findOne(
            {$or: [{username: req.body.username},
                {email: req.body.username}]});
        if (!user || user.hasPassword == false || !(await bcrypt.compare(req.body.password, user.password)))
            return next(new ApiErrors(`${req.__('invalid_login')}`, 400));
        const token = createTokens.accessToken(user._id, user.role);
        res.status(200).json({token, data: sanitization.User(user)});
    });

    adminLogin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = await usersSchema.findOne({
            $or: [  {username: req.body.username},
                    {email: req.body.username} ],
            role: {$in: ['admin', 'employee']}
        });
        if (!user || user.hasPassword == false || !(await bcrypt.compare(req.body.password, user.password)))
            return next(new ApiErrors(`${req.__('invalid_login')}`, 400));
        const token = createTokens.accessToken(user._id, user.role);
        res.status(200).json({token, data: sanitization.User(user)});
    });
    ///////////////////////////////////////////////////////////////////////////////////////
    protectedRoutes = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {    
    
        /**first stage of protection => check the token */
        let token: string = '';
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
            token = req.headers.authorization.split(' ')[1];
        else return next(new ApiErrors(`${req.__('check_login')}`, 401));
        
    /**second stage of protection => decode -> token */
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    /**third stage of protection => check the token's owner(user) exist */
        const user = await usersSchema.findById(decoded._id);/**id from the json or object (("_")id*/
        if (!user) return next(new ApiErrors(`${req.__('check_login')}`, 401));
        
    /**forth stage of protection => check the token's expiration date relative to the last change password */
        if (user.passwordChangedAt instanceof Date) {
            const changedPasswordTime: number = Math.trunc(user.passwordChangedAt.getTime() / 1000);
            if (changedPasswordTime > decoded.iat/**initialize at*/) return next(new ApiErrors(`${req.__('check_password_changed')}`, 401));
        }

        req.user = user;
        next();
    })
    
    checkActive = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user.active) return next(new ApiErrors(`${req.__('check_active')}`, 403));
        next();
    })
    

    allowedTo = (...roles: string[]) =>
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            if (!roles.includes(req.user.role)) return next(new ApiErrors(`${req.__('allowed_to')}`, 403));
            next();
        })
        ////////////////////////////////////////////////////////////////////////////////////////////

forgetPassword = asyncHandler(async (req: Request, res:Response, next:NextFunction) =>{
    const user:any = await usersSchema.findOne({email:req.body.email});
    if(!user) return next(new ApiErrors(`${req.__('check_email')}`, 404));
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const cryptedCode: string = crypto.createHash('sha256').update(resetCode).digest('hex');
    const message =`your reset code is ${resetCode}`;
    const options = {
        message,
        email:user.email,
        subject : `reset Password `
    };
    try{
        await sendMail(options);
        user.passwordResetCode= cryptedCode;
        user.passwordResetCodeExpires = Date.now()+(10*60*1000);
        user.passwordResetCodeVerify = false;
        if(user.image && user.image.startsWith(`${process.env.BASE_URL}`)) user.image = 
        user.image.split('/').pop();
        /**
         * ده علشان الصورة بدل ما تتخزن في الداتابيز بالدومين 
         * يعني مثلا=>( http://localhost:3000/images/users/user-1734194331015-image.webp )
         * تتخزن => ( user-1734194331015-image.webp )
        */
        await user.save({ validateModifiedOnly: true });
        
    }
    catch(err){
        return next(new ApiErrors(`${req.__('send_email')}`,500))
    }
    const token = createTokens.resetToken(user._id);
    res.status(200).json({token,success:true});
})

        verifyResetCode = asyncHandler(async(req:Request, res:Response,next:NextFunction) =>{
            let token: string = '';
                if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
                    token = req.headers.authorization.split(' ')[1];
                else return next(new ApiErrors(`${req.__('check_verify_code')}`, 403));
                const decoded:any = jwt.verify(token,process.env.JWT_SECRET_RESET!);
                const hashedResetCode: string = crypto.createHash('sha256').update(req.body.resetCode).digest('hex');
                const user:any = await usersSchema.findOne({
                    _id:decoded._id,
                    passwordResetCode: hashedResetCode,
                    passwordResetCodeExpires: {$gt:Date.now()},
                });/**id from the json or object (("_")id*/
                if (!user) return next(new ApiErrors(`${req.__('check_code_valid')}`, 403));
                user.passwordResetCodeVerify = true;
                if(user.image && user.image.startsWith(`${process.env.BASE_URL}`)) user.image = 
                user.image.split('/').pop();
                await user.save({
                    validateModifiedOnly: true
                });
                res.status(200).json({success:true});
            })
    resetPassword = asyncHandler(async(req:Request, res:Response,next:NextFunction) =>{
            let token: string = '';
                if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
                    token = req.headers.authorization.split(' ')[1];
                else return next(new ApiErrors(`${req.__('check_reset_code')}`, 403));
                const decoded:any = jwt.verify(token,process.env.JWT_SECRET_RESET!);
                const user:any = await usersSchema.findOne({
                    _id:decoded._id,
                    passwordResetCodeVerify: true,
                });/**id from the json or object (("_")id*/
                if (!user) return next(new ApiErrors(`${req.__('check_code_valid')}`, 403));
                user.password = req.body.password;
                user.passwordResetCodeVerify = undefined;
                user.passwordResetCodeExpires = undefined;
                user.passwordResetCode= undefined;
                user.passwordChangedAt= Date.now();
                if(user.image && user.image.startsWith(`${process.env.BASE_URL}`)) user.image = 
                user.image.split('/').pop();
                await user.save({
                    validateModifiedOnly: true
                });
                res.status(200).json({success:true});
        })


        }

const authService = new AuthService();
export default authService;

