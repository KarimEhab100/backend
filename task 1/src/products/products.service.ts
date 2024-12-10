import { Request, Response , NextFunction } from "express";
import { Products } from "./products.interface";
import ProductsSchema from "./products.schema";
import refactorService from "../refactor.service";
import sharp from "sharp";
import { uploadSingleFile } from "../middlewares/uploadFiles.middleware";

class ProductsService {
    getAll = refactorService.getAll<Products>(ProductsSchema,'products')
    createOne = refactorService.createOne<Products>(ProductsSchema)
    getOne = refactorService.getOne<Products>(ProductsSchema)
    updateOne = refactorService.updateOne<Products>(ProductsSchema)
    deleteOne = refactorService.deleteOne<Products>(ProductsSchema)
    saveImage = async(req:Request, res:Response, next:NextFunction) =>{
    if(req.file){
        const fileName:string = `product-${Date.now()}-cover.webp`;
        await sharp(req.file.buffer).resize(1200,1200).webp({quality:95}).toFile(`uploads/images/products/${fileName}`)
        req.body.cover = fileName;
    }
    next(); 
}
uploadImage = uploadSingleFile(['image'],'cover')
}


const productsService = new ProductsService();

export default productsService;