import { Router } from "express";
import productsService from "./products.service";
import productsValidation from "./products.validation";



const productsRouter:Router = Router();

productsRouter.route('/')
.get(productsService.getAll)
.post(productsValidation.createOne,productsService.createOne);



productsRouter.route('/:id')
.get(productsValidation.getOne,productsService.getOne)
.put(productsValidation.updateOne,productsService.updateOne)
.delete(productsValidation.deleteOne,productsService.deleteOne);

export default productsRouter;