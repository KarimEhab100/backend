import express from 'express';
import categoriesRouter from './categories/categories.router';
import subcategoriesRouter from './subcategories/subcategories.router';
import globalErrors from './middlewares/errors.middleware';
import ApiErrors from './utils/apiError';
import productsRouter from './products/products.router';
import usersRouter from './users/users.router';
import authRouter from './auth/auth.router';
import profileRouter from './profile/profile.router';
import googleRoute from './google/google.route';
import wishListRouter from './wishlist/wishlist.router';
import addressRouter from './address/address.router';
import reviewsRouter from './reviews/reviews.router';
import coponsRouter from './copons/copons.router';
import cartsRouter from './cart/cart.router';
import csurf from 'csurf';
import ordersRouter from './orders/orders.router';

declare module "express"{
    interface Request{
        filterData?: any;
        files?: any;
        user?: any;
    }
}
const mountRoutes = (app:express.Application) =>{
    app.use('/auth/google',googleRoute);
    // app.use(
    //     csurf({
    //         cookie: {
    //             httpOnly: true,
    //             secure: true,
    //             sameSite: 'strict',
    //         },
    //     }),
    // );
    // app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    //     res.cookie('cookies', req.csrfToken());
    //     next();
    // });
    app.use('/api/v1/categories',categoriesRouter);
    app.use('/api/v1/subcategories',subcategoriesRouter);
    app.use('/api/v1/users',usersRouter);
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/profile',profileRouter);
    app.use('/api/v1/wishlist',wishListRouter);
    app.use('/api/v1/address',addressRouter);
    app.use('/api/v1/reviews',reviewsRouter);
    app.use('/api/v1/products',productsRouter);
    app.use('/api/v1/copons',coponsRouter);
    app.use('/api/v1/cart',cartsRouter);
    app.use('/api/v1/orders',ordersRouter);
    app.all('*',(req:express.Request,res:express.Response,next:express.NextFunction)=>{
        next(new ApiErrors(`Route ${req.originalUrl} is not Found`, 400));
    });
    app.use(globalErrors);
};

export default mountRoutes;
