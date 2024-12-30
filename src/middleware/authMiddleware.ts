import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../util/jwt.util";
import { UNAUTHORIZED } from "../constants/http";

interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authMiddlware = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(UNAUTHORIZED).json({ message: 'Unauthorized' });
    }

    try {
        const user = await verifyToken(token);
        req.user = user;
        next();
    } catch (error) {
        res.status(UNAUTHORIZED).json({ message: 'Invalid token' });
    }
}