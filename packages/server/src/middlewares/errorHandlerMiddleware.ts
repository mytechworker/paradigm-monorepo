import { Request, Response, NextFunction } from 'express';

import ErrorHandler from '../utils/errorHandler';

const errorHandlerMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`>>> Error in development mode >>>`, err);

        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'Internal server error',
            stack: err.stack,
        });
    }

    if (process.env.NODE_ENV === 'production') {
        console.log(`>>> Error in production mode >>>`, err);

        let error = { ...err };

        error.message = err.message;

        // Wrong Mongoose Object ID Error
        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new ErrorHandler(404, message);
        }

        // Handling Mongoose Validation Error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors)
                .map((value: any) => value.message)
                .toString();
            error = new ErrorHandler(400, message);
        }

        // Handling Mongoose duplicate key errors
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            error = new ErrorHandler(400, message);
        }

        // Handling wrong JWT error
        if (err.name === 'JsonWebTokenError') {
            const message = 'JSON Web Token is invalid. Try again!!!';
            error = new ErrorHandler(400, message);
        }

        // Handling Expired JWT error
        if (err.name === 'TokenExpiredError') {
            const message = 'JSON Web Token is expired. Try again!!!';
            error = new ErrorHandler(400, message);
        }

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};

export default errorHandlerMiddleware;
