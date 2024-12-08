import { Request, Response , NextFunction } from "express";
import { Products } from "./products.interface";
import ProductsSchema from "./products.schema";
import refactorService from "../refactor.service";

class ProductsService {
    getAll = refactorService.getAll<Products>(ProductsSchema)
    createOne = refactorService.createOne<Products>(ProductsSchema)
    getOne = refactorService.getOne<Products>(ProductsSchema)
    updateOne = refactorService.updateOne<Products>(ProductsSchema)
    deleteOne = refactorService.deleteOne<Products>(ProductsSchema)
}


const productsService = new ProductsService();

export default productsService;