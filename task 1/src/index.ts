import express from 'express';
import categoriesRouter from './categories/categories.router';
import subcategoriesRouter from './subcategories/subcategories.router';

declare module "express"{
    interface Request{
        filterData?: any;
    }
}
const mountRoutes = (app:express.Application) =>{
    app.use('/api/v1/categories',categoriesRouter);
    app.use('/api/v1/subcategories',subcategoriesRouter);
};

export default mountRoutes;
