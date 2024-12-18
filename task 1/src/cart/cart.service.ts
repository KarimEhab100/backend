import { Request, Response , NextFunction } from "express";
import { Carts } from "./cart.interface";
import cartsSchema from "./cart.schema";
import asyncHandler from "express-async-handler";
import refactorService from "../refactor.service";
import ApiErrors from "../utils/apiError";

class CartsService {
    
    getCart = asyncHandler(async(req: Request, res:Response, next: NextFunction)=>{
        const cart = await cartsSchema.findOne({user: req.user._id});
        if(!cart) return next(new ApiErrors('Cart is Empty',404))
        res.status(200).json({data:cart});
    })
    deleteCart = asyncHandler(async(req: Request, res:Response, next: NextFunction)=>{
        const cart = await cartsSchema.findOneAndDelete({user: req.user._id});
        if(!cart) return next(new ApiErrors('Cart is Empty',404))
        res.status(204).json({});
    })
}


const cartsService = new CartsService();

export default cartsService;