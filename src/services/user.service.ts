import { CONFLICT, NOT_FOUND, UNAUTHORIZED } from "../constants/http"
import { User } from "../entity/user.entity"
import appAssert from "../util/app.assert"
import { hashPassword,comparePassword } from "../util/hash.util"
import { generateToken } from "../util/jwt.util"
import { createAccountParams, loginParams } from "../interface/user.interface"

export const createAccount = async (params: createAccountParams) => {
    try {
        //verify existing email
        const existingEmail = await User.findOne({where:  {email: params.email }})
        appAssert(!existingEmail, CONFLICT, "Email already exists")
        
        //create new account
        const user = await User.create(
            {
                name: params.name,
                email: params.email,
                password: await hashPassword(params.password),
                created_at: new Date()
            }
        ).save()
        
        return user
    } catch (error:any) {
        throw new Error(error.message)
    }
}


export const loginRequest = async (params: loginParams) => {
    try {
        //verify user exists
        const user:any = await User.findOne({where:  {email: params.email }})
        appAssert(user, UNAUTHORIZED, "User not found.")


        //compare password
        const isMatch = await comparePassword(params.password, user.password)

        appAssert(isMatch, UNAUTHORIZED, "Invalid credentials.")

        //generate jwt token
        const token = await generateToken({ userId: user.id })


        return {
            user,
            token,
        }
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export const getUserData = async (authenticatedId: number) => {
    try {
        const user = await User.findOne({where: {id: authenticatedId}})
        appAssert(user, NOT_FOUND, "User not found.")
        return user
    } catch (error) {
        
    }
}

export const updateProfile = async (userId: number, params: createAccountParams) => {
    //implement update profile logic here
    const user = await User.findOne({where:  {id: userId }})
    if(!user) {
        throw new Error("User not found.")
    }
    
    //update user profile
    user.name = params.name
    user.email = params.email
    
    await user.save()

    return user

}

interface changeName {
    name: string
}
export const updateName = async(userId: number, params: changeName)=> {
    const user = await User.findOne({where: {id: userId}})
    if(!user){
        throw new Error("User not found: " + NOT_FOUND)
    }
    
    user.name = params.name
    await user.save()

    return user
}