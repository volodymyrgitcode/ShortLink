import { z } from "zod"

export const RegisterValidationSchema = z.object({
    email: z.string()
        .email({ message: "Email must be valid" }),
    username: z.string()
        .min(4, { message: "Username must be at least 4 characters" })
        .max(16),
    password: z.string()
        .min(6, { message: "Password must be at least 5 characters" })
        .max(50, { message: "Password must be at most 50 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one digit" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
})

export const LoginValidationSchema = z.object({
    email: z.string().email({ message: "Email must be valid" }),
    password: z.string(),
});