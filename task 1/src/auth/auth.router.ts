import {Router} from 'express';
import authService from "./auth.service";
import authValidation from "./auth.validation";

const authRouter: Router = Router();

authRouter.route('/signup')
.post(authValidation.signup, authService.signup);
authRouter.route('/login')
.post(authValidation.login, authService.login);
authRouter.route('/admin-login')
.post( authValidation.login, authService.adminLogin);

export default authRouter;