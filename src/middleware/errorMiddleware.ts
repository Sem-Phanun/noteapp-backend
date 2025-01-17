import { ErrorRequestHandler, Response } from "express";
import { z } from 'zod'
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import GlobalExceptionHandler from "../exception/exceptionHandler";


const handleZodError = (res: Response, error: z.ZodError) => {
    const errors = error.issues.map((err) => {
        path: err.path.join(".")
        message: err.message
    })
    return res.status(BAD_REQUEST).json({
        errors,
        message: error,
    })
}

const handleError = (res: Response, error: GlobalExceptionHandler) => {
    return res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
    })
}

const errorMiddlewareHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.log(`PATH:${req.path}`, error)

    if(error instanceof z.ZodError) {
        handleZodError(res, error);
        return
    }
    if(error instanceof GlobalExceptionHandler) {
        handleError(res, error)
        return
    }
    res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
    next();
}

export default errorMiddlewareHandler;