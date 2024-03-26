import { z } from "zod";


export const supportFormSchema = z.object({
    name: z.string().min(1, {
      message: "Name cannot be empty.",
    }),
    email: z.string().email({
        message: "Invalid email format. Please provide a valid email address.",
    }),
    description: z.string().min(4, {
        message: "Description must be at least 4 characters.",
    }).max(200,{
        message: "Description must be less than 200 characters."
    }),
    status: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
  