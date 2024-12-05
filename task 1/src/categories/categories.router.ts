import { Router } from "express";
import categoriesService from "./categories.service";
import subcategoriesRouter from "../subcategories/subcategories.router";


const categoriesRouter = Router();

categoriesRouter.use('/:categoryId/subcategories',subcategoriesRouter)

categoriesRouter.route('/')
.get(categoriesService.getAll)
.post(categoriesService.createOne);

categoriesRouter.route('/:id')
.get(categoriesService.getOne)
.put(categoriesService.updateOne)
.delete(categoriesService.deleteOne);

export default categoriesRouter;