import { Router } from "express";
import reviewsService from "./reviews.service";
import reviewsValidation from "./reviews.validation";
import authService from "../auth/auth.service";


const reviewsRouter:Router = Router({mergeParams:true});

reviewsRouter.route('/')
.get(reviewsService.filterReviews,reviewsService.getAll)
.post(authService.protectedRoutes,authService.checkActive,authService.allowedTo('user'),reviewsService.setIds,reviewsValidation.createOne, reviewsService.createOne);

reviewsRouter.route('/my')
.get(authService.protectedRoutes,authService.checkActive,authService.allowedTo('user'),reviewsService.filterReviews,reviewsService.getAll)

reviewsRouter.route('/:id')
.get(authService.protectedRoutes,authService.checkActive,authService.allowedTo('user'),reviewsValidation.getOne,reviewsService.getOne)
.put(authService.protectedRoutes,authService.checkActive,authService.allowedTo('user'),reviewsValidation.updateOne,reviewsService.updateOne)
.delete(authService.protectedRoutes,authService.checkActive,authService.allowedTo('user','admin','employee'),reviewsValidation.deleteOne,reviewsService.deleteOne);

export default reviewsRouter;