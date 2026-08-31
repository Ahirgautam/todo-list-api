import { z } from "zod"

export const registerSchema = z.object({
    name: z.string().min(3, { message: "Username must be at least 3 characters long" }).max(18, { message: "Username must be at most 18 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }).max(20, { message: "Password must be at most 20 characters long" })
})

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }).max(20, { message: "Password must be at most 20 characters long" })
})