import express from 'express';
import ApiErrors from '../utils/apiError';


const devError = (err:any,res:express.Response) => 
    res.status(err.statusCode!).json({
        error: err,
        message:err.message,
        status:err.status,
        stack:err.stack,
    })

const prodError = (err:any,res:express.Response) => {
    res.status(err.statusCode!).json({
        message: err.message,
        status:err.status
    })
}

    const handleJwtExpired = (message:string,res:express.Response)=>{
    return new ApiErrors(message,401);
    }

const globalErrors = (err:any,req:express.Request,res: express.Response,next : express.NextFunction) => {
        err.statusCode = err.statusCode || 500;
        err.message = err.message || "Error: ";
        if(err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") err = 
        handleJwtExpired(`${req.__('session_expired')}`,res)
        if(process.env.Node_ENV === 'development'){
            devError(err,res);
        }else{
            prodError(err,res);
        }
}

export default globalErrors;

