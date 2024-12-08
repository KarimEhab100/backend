import { Router } from "express";
import categoriesService from "./categories.service";
import subcategoriesRouter from "../subcategories/subcategories.router";
import { body } from "express-validator";
import validatorMiddleware from "../middlewares/validator.middleware";
import categoriesSchema from "./categories.schema";
import categoriesValidation from "./categories.validation";


const categoriesRouter = Router();

categoriesRouter.use('/:categoryId/subcategories',subcategoriesRouter)

categoriesRouter.route('/')
.get(categoriesService.getAll)
.post(categoriesValidation.createOne,categoriesService.createOne);

categoriesRouter.route('/:id')
.get(categoriesValidation.getOne,categoriesService.getOne)
.put(categoriesValidation.createOne,categoriesService.updateOne)
.delete(categoriesValidation.deleteOne,categoriesService.deleteOne);

export default categoriesRouter;