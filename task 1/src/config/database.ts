import mongoose from "mongoose";

const dbConnection = ()=>{
    mongoose.connect(process.env.DB!).then(()=>{
        console.log('Connected to MongoDB')
    }).catch((err)=>{
        console.log(err);
    })
} 
export default dbConnection;