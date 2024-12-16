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

declare module "express"{
    interface Request{
        filterData?: any;
        files?: any;
        user?: any;
    }
}
const mountRoutes = (app:express.Application) =>{
    app.use('/api/v1/categories',categoriesRouter);
    app.use('/api/v1/subcategories',subcategoriesRouter);
    app.use('/api/v1/products',productsRouter);
    app.use('/api/v1/users',usersRouter);
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/profile',profileRouter);
    app.use('/api/v1/wishlist',wishListRouter);
    app.use('/api/v1/address',addressRouter);
    app.use('/auth/google',googleRoute);
    app.all('*',(req:express.Request,res:express.Response,next:express.NextFunction)=>{
        next(new ApiErrors(`Route ${req.originalUrl} is not Found`, 400));
    });
    app.use(globalErrors);
};

export default mountRoutes;
