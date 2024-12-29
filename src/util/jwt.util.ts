
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../constants/env'
import Invalid from '../constants/invalidtoken';

export const generateToken = (payload: object, expiresIn: string = "7d"): string => {
	return jwt.sign(payload, JWT_KEY, { expiresIn });
}

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, JWT_KEY)
    } catch (error) {
        throw new Error("Invalid token: " + token)
    }
}