import { Request, Response , NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { Subcategories } from "./subcategories.interface";
import subcategoriesSchema from "./subcategories.schema";
import refactorService from "../refactor.service";

class SubcategoriesService {
    filterSubcategories(req: Request, res: Response, next: NextFunction){
        const filterData:any = {};
        if(req.params.categoryId) filterData.category = req.params.categoryId;
        req.filterData = filterData;
        next();
    }

    setCategoryId(req:Request, res: Response, next: NextFunction){
        if(req.params.categoryId && !req.body.category)req.body.category = req.params.categoryId;
        next();
    }
    getAll = refactorService.getAll<Subcategories>(subcategoriesSchema)
    createOne = refactorService.createOne<Subcategories>(subcategoriesSchema)
    getOne = refactorService.getOne<Subcategories>(subcategoriesSchema)
    updateOne = refactorService.updateOne<Subcategories>(subcategoriesSchema)
    deleteOne = refactorService.deleteOne<Subcategories>(subcategoriesSchema)
}


const subcategoriesService = new SubcategoriesService();

export default subcategoriesService;