import { Request, Response , NextFunction } from "express";
import { Categories } from "./categories.interface";
import categoriesSchema from "./categories.schema";
import asyncHandler from "express-async-handler";
import refactorService from "../refactor.service";

class CategoriesService {
    getAll = refactorService.getAll<Categories>(categoriesSchema)
    createOne = refactorService.createOne<Categories>(categoriesSchema)
    getOne = refactorService.getOne<Categories>(categoriesSchema)
    updateOne = refactorService.updateOne<Categories>(categoriesSchema)
    deleteOne = refactorService.deleteOne<Categories>(categoriesSchema)
}


const categoriesService = new CategoriesService();

export default categoriesService;