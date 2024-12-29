import {z} from 'zod';

export const userSchema = z.object({
    name: z.string().min(6).max(250),
    email: z.string().email().max(50),
    password: z.string().min(6).max(50),
});
