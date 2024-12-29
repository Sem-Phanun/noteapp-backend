import { CONFLICT, UNAUTHORIZED } from "../constants/http"
import { User } from "../entity/user.entity"
import appAssert from "../util/app.assert"
import { hashPassword,comparePassword } from "../util/hash.util"
import { generateToken } from "../util/jwt.util"

type createAccountParams = {
    name: string,
    email: string,
    password: string
}

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

type loginParams = {
    email: string,
    password: string,
}
export const loginRequest = async (params: loginParams) => {
    try {
        //verify user exists
        const user = await User.findOne({where:  {email: params.email }})
        appAssert(user, UNAUTHORIZED, "User not found.")

        //generate jwt token
        const token = await generateToken({ userId: user.id })


        //compare password
        const isMatch = await comparePassword(params.password, user.password)

        appAssert(isMatch, UNAUTHORIZED, "Invalid credentials.")


        return {
            user,
            token,
        }
    } catch (error:any) {
        throw new Error(error.message)
    }
}