import { z } from 'zod'

export const emailSchema = z.string().min(10).max(50)
export const passwordSchema = z.string().min(6, "Password must be at least 6 characters long").max(50)

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema
})