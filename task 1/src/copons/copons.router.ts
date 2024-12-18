import {Router} from 'express';
import coponsService from "./copons.service";
import coponsValidation from "./copons.validation";
import authService from "../auth/auth.service";

const coponsRouter: Router = Router();

coponsRouter.use(authService.protectedRoutes, authService.checkActive, authService.allowedTo('admin', 'employee'));

coponsRouter.route('/')
    .get(coponsService.getAll)
    .post(coponsValidation.createOne, coponsService.createOne);

coponsRouter.route('/:id')
    .get(coponsValidation.getOne, coponsService.getOne)
    .put(coponsValidation.updateOne, coponsService.updateOne)
    .delete(coponsValidation.deleteOne, coponsService.deleteOne);

export default coponsRouter;