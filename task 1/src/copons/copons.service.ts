import { Request, Response , NextFunction } from "express";
import { Copons } from "./copons.interface";
import categoriesSchema from "./copons.schema";
import asyncHandler from "express-async-handler";
import refactorService from "../refactor.service";
import coponsSchema from "./copons.schema";

class CoponsService {
    getAll = refactorService.getAll<Copons>(coponsSchema)
    createOne = refactorService.createOne<Copons>(coponsSchema)
    getOne = refactorService.getOne<Copons>(coponsSchema)
    updateOne = refactorService.updateOne<Copons>(coponsSchema)
    deleteOne = refactorService.deleteOne<Copons>(coponsSchema)
}


const coponsService = new CoponsService();

export default coponsService;