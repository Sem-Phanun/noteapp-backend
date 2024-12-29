import { Request, Response } from "express";
import catchErrors from '../util/catch.error.util';
import { userSchema } from '../schema/user.schema'
import { createAccount, loginRequest } from '../services/user.service';
import { CONFLICT, CREATED, INTERNAL_SERVER_ERROR, OK } from '../constants/http';
import { loginSchema } from '../schema/login.schema';
import { generateToken } from "../util/jwt.util";

export const registerHandler = catchErrors(async (req: Request, res: Response) => {
    const requestUser = userSchema.parse({...req.body})
    
    try {
       const user = await createAccount(requestUser)
        res.status(CREATED).json({ 
            message: 'User created', user 
        })
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({ 
            message: 'An error occurred while creating the user', 
            status: CONFLICT + " email already exists"
        })
    }
    
    
})

export const loginHandler = catchErrors(async (req: Request, res: Response) => {
    const request = loginSchema.parse({
        ...req.body,
    })

    try {
        const user = await loginRequest(request)

        if(user) {
            res.status(OK).json({
                message: "Login successful",
                user: user,
            })
        }
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({
            message: 'An error occurred while logging in',
        })
    }
})