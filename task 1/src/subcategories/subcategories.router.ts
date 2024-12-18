import { Router } from "express";
import subcategoriesService from "./subcategories.service";
import subcategoriesValidation from "./subcategories.validation";
import authService from "../auth/auth.service";



const subcategoriesRouter:Router = Router({mergeParams:true});

subcategoriesRouter.route('/')
.get(subcategoriesService.filterSubcategories,subcategoriesService.getAll)
.post(authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),subcategoriesService.setCategoryId,subcategoriesValidation.createOne,subcategoriesService.createOne);


subcategoriesRouter.route('/:id')
.get(subcategoriesValidation.getOne,subcategoriesService.getOne)
.put(authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),subcategoriesValidation.updateOne,subcategoriesService.updateOne)
.delete(authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),subcategoriesValidation.deleteOne,subcategoriesService.deleteOne);

export default subcategoriesRouter;