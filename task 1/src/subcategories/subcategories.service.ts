import { Request, Response , NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { Subcategories } from "./subcategories.interface";
import subcategoriesSchema from "./subcategories.schema";

class SubcategoriesService {
    filterSubcategories(req: Request, res: Response, next: NextFunction){
        const filterData:any = {};
        if(req.params.categoryId) filterData.category = req.params.categoryId;
        req.filterData = filterData;
        next();
    }

    setCategoryId(req: Request, res: Response, next: NextFunction){
        if(req.params.categoryId && !req.body.category)req.body.category = req.params.categoryId;
        next();
    }
    getAll = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        let filterData:any = {};
        if (req.filterData) filterData =req.filterData;
        const subcategories:Subcategories[] = await subcategoriesSchema.find(filterData);
        res.status(200).json({ data: subcategories});
    })
    
    createOne = asyncHandler(async(req: Request, res: Response, next: NextFunction) =>{
        const subcategory:Subcategories = await subcategoriesSchema.create(req.body);
        res.status(201).json({ data : subcategory})
    });

    getOne = asyncHandler(async(req: Request, res: Response, next: NextFunction) =>{
        const subcategory:Subcategories | null = await subcategoriesSchema.findById(req.params.id);
        res.status(200).json({ data : subcategory})
        });
        
updateOne = asyncHandler(async(req: Request, res: Response, next: NextFunction) =>{
        const subcategory:Subcategories | null = await subcategoriesSchema.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json({ data : subcategory})
    });

    deleteOne = asyncHandler(async(req: Request, res: Response, next: NextFunction) =>{
        const subcategory:Subcategories | null = await subcategoriesSchema.findByIdAndDelete(req.params.id);
        res.status(204).json()
    }
);
}


const subcategoriesService = new SubcategoriesService();

export default subcategoriesService;