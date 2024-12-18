import { Request, Response , NextFunction } from "express";
import { Reviews } from "./reviews.interface";
import reviewsSchema from "./reviews.schema";
import asyncHandler from "express-async-handler";
import refactorService from "../refactor.service";

class ReviewsService {
    setIds(req: Request, res: Response, next: NextFunction){
        req.body.user = req.user._id;
        req.body.product = req.params.productId;
        next();
    }
    filterReviews(req: Request, res: Response, next: NextFunction){
        const filterData:any = {};
        if(req.params.productId)filterData.product = req.params.productId;
        if(!req.params.productId && req.user && req.user.role === 'user')filterData.user = req.user._id
        req.filterData = filterData;
        next();
    }
    getAll = refactorService.getAll<Reviews>(reviewsSchema)
    createOne = refactorService.createOne<Reviews>(reviewsSchema)
    getOne = refactorService.getOne<Reviews>(reviewsSchema)
    updateOne = refactorService.updateOne<Reviews>(reviewsSchema)
    deleteOne = refactorService.deleteOne<Reviews>(reviewsSchema)
}


const reviewsService = new ReviewsService();

export default reviewsService;