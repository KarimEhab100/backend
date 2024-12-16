import { Router } from "express";
import profileService from "./profile.service";
import profileValidation from "./profile.validation";
import authService from "../auth/auth.service";
import usersService from "./profile.service";


const profileRouter:Router = Router();

profileRouter.use(authService.protectedRoutes, authService.checkActive);


profileRouter.route('/')
.get(usersService.setUserId,profileService.getOne)
.put(profileService.uploadImage,profileService.saveImage,profileValidation.updateOne,profileService.updateOne)
.delete(authService.allowedTo("user"),profileValidation.deleteOne,profileService.deleteOne);


profileRouter.put('/create-password',profileValidation.changePassword,profileService.createPassword)
profileRouter.put('/change-password',profileValidation.changePassword,profileService.changePassword)


export default profileRouter;