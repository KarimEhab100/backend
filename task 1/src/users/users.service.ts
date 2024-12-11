import { Request, Response , NextFunction } from "express";
import { Users } from "./users.interface";
import usersSchema from "./users.schema";
import asyncHandler from "express-async-handler";
import refactorService from "../refactor.service";
import ApiErrors from "../utils/apiError";
import { uploadSingleFile } from "../middlewares/uploadFiles.middleware";
import sharp from "sharp";
import bcrypt from "bcrypt";

class UsersService {
    getAll = refactorService.getAll<Users>(usersSchema)
    createOne = refactorService.createOne<Users>(usersSchema)
    getOne = refactorService.getOne<Users>(usersSchema)
    ///////////////////////////////////////////////////////////////////////
    /*update user info */
    updateOne =asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    const user:Users|null = await usersSchema.findByIdAndUpdate(req.params.id,
        {name: req.body.name,
        image:req.body.image,
        active:req.body.active}
        ,{new: true});
        if(!user) return next(new ApiErrors(`User ${req.__('not found')}`,404));
        res.status(200).json({data:user});
    })
    deleteOne = refactorService.deleteOne<Users>(usersSchema)
///////////////////////////////////////////////////////////////////////////////////////////
        /*change password section */
    changePassword = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const user:Users|null = await usersSchema.findByIdAndUpdate(req.params.id,
            { password: await bcrypt.hash(req.body.password, 13),
            passwordChangedAt:Date.now(),
            }
            ,{new: true});
            if(!user) return next(new ApiErrors(`${req.__('not found')}`,404));
            res.status(200).json({data:user});
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