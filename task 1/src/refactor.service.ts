import { Request, Response , NextFunction } from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import ApiErrors from "./utils/apiError";
import { promises } from "dns";



class RefactorService {



/**************************************************** */

    getAll = <modelType>(model:mongoose.Model<any>)=>
        asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
            let filterData:any = {};
        if (req.filterData) filterData =req.filterData;
        const documents:modelType[] = await model.find(filterData);
        res.status(200).json({ data: documents});
    })
    
    createOne = <modelType>(model:mongoose.Model<any>)=>
    asyncHandler(async(req: Request, res: Response, next: NextFunction) =>{
        const documents:modelType = await model.create(req.body);
        res.status(201).json({ data : documents})
    });

    getOne = <modelType>(model:mongoose.Model<any>)=>
    asyncHandler(async(req: Request, res: Response, next: NextFunction):Promise<void> =>{
        const documents:modelType | null = await model.findById(req.params.id);
        if (!documents) return next(new ApiErrors(`${req.__('not_found')}`,404));
        res.status(200).json({ data : documents})
    });

    updateOne = <modelType>(model:mongoose.Model<any>)=>
    asyncHandler(async(req: Request, res: Response, next: NextFunction):Promise<void> =>{
        const documents:modelType | null = await model.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if (!documents) return next(new ApiErrors(`${req.__('not_found')}`,404));
        res.status(200).json({ data : documents})
    });

    deleteOne = <modelType>(model:mongoose.Model<any>)=>
    asyncHandler(async(req: Request, res: Response, next: NextFunction):Promise<void> =>{
        const documents:modelType | null = await model.findByIdAndDelete(req.params.id);
        if (!documents) return next(new ApiErrors(`${req.__('not_found')}`,404));
        res.status(204).json()
    });
}


const refactorService = new RefactorService();

export default refactorService;