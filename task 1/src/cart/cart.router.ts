import { Router } from "express";
import categoriesService from "./cart.service";
import subcategoriesRouter from "../subcategories/subcategories.router";
import { body } from "express-validator";
import validatorMiddleware from "../middlewares/validator.middleware";
import categoriesSchema from "./cart.schema";
import categoriesValidation from "./cart.validation";
import authService from "../auth/auth.service";


const categoriesRouter = Router();

categoriesRouter.use('/:categoryId/subcategories',subcategoriesRouter)

categoriesRouter.route('/')
.get(categoriesService.getAll)
.post(authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),categoriesValidation.createOne,categoriesService.createOne);

categoriesRouter.route('/:id')
.get(categoriesValidation.getOne,categoriesService.getOne)
.put(authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),categoriesValidation.createOne,categoriesService.updateOne)
.delete(authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),categoriesValidation.deleteOne,categoriesService.deleteOne);

export default categoriesRouter;