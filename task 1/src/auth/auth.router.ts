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

authRouter.route('/forget-password')
.post( authValidation.forgetPassword, authService.forgetPassword);

authRouter.route('/verify-code')
.post(authService.verifyResetCode);

authRouter.route('/reset-password')
.post(authValidation.changePassword,authService.resetPassword);

export default authRouter;