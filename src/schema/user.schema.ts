import {z} from 'zod';


// export let nameSchemas = z.string().min(1).max(250);
export const emailSchema = z.string().min(10).max(50)
export const passwordSchema = z.string().min(6, "Password must be at least 6 characters long").max(50)

export const userSchema = z.object({
    name: z.string().min(1).max(250),
    email: emailSchema,
    password: passwordSchema,
});

export const nameSchema = z.object({
    name: z.string().min(1).max(250),
});