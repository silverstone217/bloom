import { z } from "zod"

export const BlogSchema = z.object({
    title : z.string().min(3, ("title must be at least more than 3 characters")).trim(),
    content: z.string().min(10, ("content must be at least 10 characters")).trim(),
})