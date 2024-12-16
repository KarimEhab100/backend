import { Request, Response , NextFunction } from "express";
import { Users } from "../users/users.interface";
import usersSchema from "../users/users.schema";
import asyncHandler from "express-async-handler";
import ApiErrors from "../utils/apiError";


class AddressService {
    /**get user id from req and pass it to params */
    setUserId = (req: Request, res: Response, next: NextFunction) =>{
        req.params.id = req.user._id;
        next();
    }
    ////////////////////////////////////////////////////////////////
    /*update user info */
    getAddress =asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    const user:Users|null = await usersSchema.findById(req.user._id)
        if(!user) return next(new ApiErrors(`User ${req.__('not found')}`,404));
        res.status(200).json({length:user.address.length,data:user.address});
    })
    addAddress =asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    const user:Users|null = await usersSchema.findByIdAndUpdate(req.user._id,{$addToSet:{address:req.body.address}},{new:true});
    if(!user) return next(new ApiErrors(`User ${req.__('not found')}`,404));
        res.status(200).json({length:user.address.length,data:user.address});
    })
    removeAddress =asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const user:Users|null = await usersSchema.findByIdAndUpdate(req.user._id,{$pull:{address:{_id:req.params.addressId}}},{new:true});
    if(!user) return next(new ApiErrors(`User ${req.__('not found')}`,404));
        res.status(200).json({length:user.address.length,data:user.address});
    })

}


const addressService = new AddressService();

export default addressService;