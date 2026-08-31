import { z } from "zod"

export const todoSchema = z.object({
    title: z.string().min(3, { error: "Title must be at least 3 characters long" }).max(50, { message: "Title must be at most 50 characters long" }),
    description: z.string({ error: "invalid data type" }),
    status: z.string()
})

