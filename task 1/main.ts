import { Server } from "http";
import  express  from "express";
import dbConnection from "./src/config/database";
import categoriesRouter from "./src/categories/categories.router";
import subcategoriesRouter from "./src/subcategories/subcategories.router";
import dotenv from "dotenv";
import hpp from "hpp";
import i18n from "i18n";
import mountRoutes from "./src";
import path from "path";


const app = express();
let server: Server;
//****************** */
dotenv.config()
//******************* */
//******************* */
app.use(express.static('uploads'));///* OR */app.use(express.static(path.join(__dirname, 'uploads')));    
//******************* */
app.use(hpp()) 
i18n.configure({
    locales: ['ar','en'],
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'en',
    queryParameter:'lang'
})
app.use(i18n.init);
app.use(express.json({limit: '10kb'}));

//********************/
dbConnection();
//*****************/ 
mountRoutes(app);

server = app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);});

    process.on('unhandledRejection', (err: Error) => {
        console.error(`unhandledRejection ${err.name} | ${err.message}`);
        server.close(() => {
            console.error('shutting the application down');
            process.exit(1);
        });
    });