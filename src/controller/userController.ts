import {Request, Response } from "express";
import catchErrors from '../util/catch.error.util';
import { nameSchema, userSchema } from '../schema/user.schema'
import { createAccount, loginRequest, updateName, updateProfile } from '../services/user.service';
import { CONFLICT, CREATED, INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from '../constants/http';
import { loginSchema } from '../schema/login.schema';
import { User } from "../entity/user.entity";

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

export const getUser = catchErrors( async (req:Request, res: Response): Promise<any> => {
    const userId = req.body.user
    const user = await User.findOne({where: {id: userId}})
    
    if(!user) {
        return res.status(INTERNAL_SERVER_ERROR).json({
            message: 'User not found',
        })
    }else {
        res.status(OK).json({
            message: "User retrieved successfully",
            user: user,
        })
    }
});

export const updateUser = catchErrors(async (req: Request, res: Response): Promise<any> => {
    const userId = req.body.userId
    const requestUser = userSchema.parse({...req.body})
    
    try {
        await updateProfile(userId, requestUser)
        res.status(OK).json({
            message: "User updated successfully",
            user: requestUser,
        })
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({
            message: 'An error occurred while updating the user',
        })
    }
})

export const updateNameHandler = catchErrors(async (req: Request, res: Response): Promise<any> => {
    const userId = req.body.userId
    const requestNewName = nameSchema.parse({...req.body})

    try {
        await updateName(userId, requestNewName)
        res.status(OK).json({
            message: "User name updated successfully",
            newName: requestNewName,
        })
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({
            message: 'An error occurred while updating the user name',
        })
    }
})
export const logoutHandler = catchErrors(async (req: Request, res: Response): Promise<any> => {
    res.json({ message: "Logged out successfully" })
})