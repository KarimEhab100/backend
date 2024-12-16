import { Request, Response , NextFunction } from "express";
import { Users } from "../users/users.interface";
import usersSchema from "../users/users.schema";
import asyncHandler from "express-async-handler";
import refactorService from "../refactor.service";
import ApiErrors from "../utils/apiError";
import { uploadSingleFile } from "../middlewares/uploadFiles.middleware";
import sharp from "sharp";
import bcrypt from "bcrypt";
import createTokens from "../utils/tokens";
import sanitization from "../utils/sanitization";

class UsersService {
    /**get user id from req and pass it to params */
    setUserId = (req: Request, res: Response, next: NextFunction) =>{
        req.params.id = req.user._id;
        next();
    }
    ////////////////////////////////////////////////////////////////
    getOne = refactorService.getOne<Users>(usersSchema)
    ///////////////////////////////////////////////////////////////////////
    /*update user info */
    updateOne =asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    const user:Users|null = await usersSchema.findByIdAndUpdate(req.user._id,
        {name: req.body.name,
        image:req.body.image,
        }
        ,{new: true});
        if(!user) return next(new ApiErrors(`User ${req.__('not found')}`,404));
        res.status(200).json({data:sanitization.User(user)});
    })
    deleteOne = refactorService.deleteOne<Users>(usersSchema)
///////////////////////////////////////////////////////////////////////////////////////////
        /*change password section */
    changePassword = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const user:Users|null = await usersSchema.findByIdAndUpdate(req.user._id,
            { password: await bcrypt.hash(req.body.password, 13),
            passwordChangedAt:Date.now(),
            }
            ,{new: true});
            const token = createTokens.accessToken(user?._id,user?.role!)
            if(!user) return next(new ApiErrors(`${req.__('not found')}`,404));
            res.status(200).json({token,data:sanitization.User(user)});
        })
        /////////////////////////////////////////////////////////////////////////////////
        /**create password after Google authentication */
    createPassword = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const user:Users|null = await usersSchema.findOneAndUpdate(
            {_id:req.user._id/**OR we can use (req.user._id)*/,
            hasPassword:false},
            { password: await bcrypt.hash(req.body.password, 13)}
            ,{new: true});
            if(!user) return next(new ApiErrors(`${req.__('not found')}`,404));
            res.status(200).json({data:sanitization.User(user)});
        })
        ///////////////////////////////////////////////////////////////////////////
        /*for uploading the image */
        uploadImage = uploadSingleFile(['image'],'image');
        saveImage = async(req: Request, res: Response, next: NextFunction) =>{
        if (req.file){
            const fileName:string = `user-${Date.now()}-image.webp`;
            await sharp(req.file.buffer)
            .resize(1200,1200)
            .webp({quality:95})
            .toFile(`uploads/images/users/${fileName}`)
            req.body.image = fileName;
        }next();
}
}


const usersService = new UsersService();

export default usersService;