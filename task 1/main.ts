import  express  from "express";
import dbConnection from "./src/config/database";
import categoriesRouter from "./src/categories/categories.router";
import subcategoriesRouter from "./src/subcategories/subcategories.router";
import dotenv from "dotenv";
import mountRoutes from "./src";


const app = express();

//****************** */
dotenv.config()
//******************* */


app.use(express.json({limit: '10kb'}));

//********************/
dbConnection();
//*****************/ 
mountRoutes(app);

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);});