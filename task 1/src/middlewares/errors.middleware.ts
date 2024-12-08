import express from 'express';


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

const globalErrors = (err:any,req:express.Request,res: express.Response,next : express.NextFunction) => {
        err.statusCode = err.statusCode || 500;
        err.message = err.message || "Error: ";
        if(process.env.Node_ENV === 'development'){
            devError(err,res);
        }else{
            prodError(err,res);
        }
}

export default globalErrors;

