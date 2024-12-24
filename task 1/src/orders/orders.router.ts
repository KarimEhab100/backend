import {Router} from 'express';
import ordersService from "./orders.service";
import authService from "../auth/auth.service";

const ordersRouter: Router = Router();

ordersRouter.use(authService.protectedRoutes, authService.checkActive);

ordersRouter.route('/')
    .get(ordersService.filterOrders, ordersService.getAll)
    .post(authService.allowedTo('user'), ordersService.createCashOrder);


    
ordersRouter.route('/:id/deliver')
.put(authService.allowedTo('admin', 'employee'), ordersService.deliverOrder);
ordersRouter.route('/:id/pay')
.put( authService.allowedTo('admin', 'employee'), ordersService.payOrder);

export default ordersRouter;