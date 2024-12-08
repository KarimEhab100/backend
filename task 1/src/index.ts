import express from 'express';
import categoriesRouter from './categories/categories.router';
import subcategoriesRouter from './subcategories/subcategories.router';
import globalErrors from './middlewares/errors.middleware';
import ApiErrors from './utils/apiError';
import productsRouter from './products/products.router';

declare module "express"{
    interface Request{
        filterData?: any;
    }
}
const mountRoutes = (app:express.Application) =>{
    app.use('/api/v1/categories',categoriesRouter);
    app.use('/api/v1/subcategories',subcategoriesRouter);
    app.use('/api/v1/products',productsRouter);
    app.all('*',(req:express.Request,res:express.Response,next:express.NextFunction)=>{
        next(new ApiErrors(`Route ${req.originalUrl} is not Found`, 400));
    });
    app.use(globalErrors);
};

export default mountRoutes;
