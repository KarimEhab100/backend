import { Router } from "express";
import authService from "../auth/auth.service";
import wishListService from "./wishlist.service";


const wishListRouter:Router = Router();

wishListRouter.use(authService.protectedRoutes, authService.checkActive);


wishListRouter.route('/')
.get(wishListService.getWishList)
.post(wishListService.addToWishList)
wishListRouter.delete('/:productId',wishListService.removeFromWishList);


export default wishListRouter;