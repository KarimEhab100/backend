import { Router ,Request,Response,NextFunction} from "express";
import productsService from "./products.service";
import productsValidation from "./products.validation";
import multer from "multer";
import { createBrotliCompress } from "zlib";
import sharp  from "sharp";



 




const productsRouter:Router = Router();

productsRouter.route('/')
.get(productsService.getAll)
.post(productsService.uploadImage,productsService.saveImage,productsValidation.createOne,productsService.createOne);



productsRouter.route('/:id')
.get(productsValidation.getOne,productsService.getOne)
.put(productsService.uploadImage,productsService.saveImage,productsValidation.updateOne,productsService.updateOne)
.delete(productsValidation.deleteOne,productsService.deleteOne);

export default productsRouter;