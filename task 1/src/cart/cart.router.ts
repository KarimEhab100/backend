import { Router } from "express";
import cartsService from "./cart.service";
import cartsValidation from "./cart.validation";
import authService from "../auth/auth.service";


const cartsRouter = Router();

cartsRouter.use(authService.protectedRoutes,authService.checkActive,authService.allowedTo('user'))

cartsRouter.route('/')
.get(cartsService.getCart)
.post(cartsValidation.addToCart,cartsService.addToCart)
.delete(cartsService.deleteCart);

cartsRouter.route('/:itemId')
.put(cartsValidation.updateQuqntity,cartsService.updateQuantity)
.delete(cartsValidation.removeFromCart,cartsService.removeFromCart)

cartsRouter.route('/apply-copon')
.put(cartsService.upplyCopon)

export default cartsRouter;