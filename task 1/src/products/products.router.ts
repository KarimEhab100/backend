import { Router ,Request,Response,NextFunction} from "express";
import productsService from "./products.service";
import productsValidation from "./products.validation";
import reviewsRouter from "../reviews/reviews.router";
import authService from "../auth/auth.service";


const productsRouter:Router = Router();

productsRouter.use('/:productId/reviews',reviewsRouter)

productsRouter.route('/')
.get(productsService.getAll)
.post(authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),productsService.uploadImages,productsService.saveImage,productsValidation.createOne,productsService.createOne);

productsRouter.route('/:id')
.get(productsValidation.getOne,productsService.getOne)
.put(authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),productsService.uploadImages,productsService.saveImage,productsValidation.updateOne,productsService.updateOne)
.delete(authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),productsValidation.deleteOne,productsService.deleteOne);

export default productsRouter;