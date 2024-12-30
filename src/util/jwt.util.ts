
import jwt from 'jsonwebtoken';
import { JWT_KEY, REFRESH_TOKEN } from '../constants/env'

export const generateToken = (payload: object, expiresIn: string = "10m") => {
	const accessToken = jwt.sign(payload, JWT_KEY, { expiresIn });

    return accessToken;
}

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, JWT_KEY)
    } catch (error) {
        throw new Error("Invalid token: " + token)
    }
}
export const verifyRefreshToken = (token: string): any => {
    return jwt.verify(token, REFRESH_TOKEN)
}
