import { Request, Response , NextFunction } from "express";
import { Users } from "../users/users.interface";
import usersSchema from "../users/users.schema";
import asyncHandler from "express-async-handler";
import ApiErrors from "../utils/apiError";


class WishListService {
    /**get user id from req and pass it to params */
    setUserId = (req: Request, res: Response, next: NextFunction) =>{
        req.params.id = req.user._id;
        next();
    }
    ////////////////////////////////////////////////////////////////
    /*update user info */
    getWishList =asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    const user:Users|null = await usersSchema.findById(req.user._id).populate('wishList');
        if(!user) return next(new ApiErrors(`User ${req.__('not found')}`,404));
        res.status(200).json({length:user.wishList.length,data:user.wishList});
    })
    addToWishList =asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    const user:Users|null = await usersSchema.findByIdAndUpdate(req.user._id,{$addToSet:{wishList:req.body.productId}},{new:true});
    if(!user) return next(new ApiErrors(`User ${req.__('not found')}`,404));
    await user.populate('wishList')
        res.status(200).json({length:user.wishList.length,data:user.wishList});
    })
    removeFromWishList =asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const user:Users|null = await usersSchema.findByIdAndUpdate(req.user._id,{$pull:{wishList:req.params.productId}},{new:true});
    if(!user) return next(new ApiErrors(`User ${req.__('not found')}`,404));
    await user.populate('wishList')
        res.status(200).json({length:user.wishList.length,data:user.wishList});
    })

}


const wishListService = new WishListService();

export default wishListService;