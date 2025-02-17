import regex from "@/lib/regex";
import { z } from "zod";

export const loginValidator = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        message: 'password is required'
    })
})

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const registerValidator = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: 'Password is required'
    }).refine(data => passwordRegex.test(data), {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character and must be at least 8 characters long'
    }),
    confirmPassword: z.string(),
    role: z.string()
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        return ctx.addIssue({
            path: ['confirmPassword'],
            code: 'custom',
            message: 'password and confirm password must be same'
        })
    }
})

export const forgotPasswordValidator = z.object({
    email: z.string().email()
})

export const resetPasswordValidator = z.object({
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters long'
    }).refine(data => regex.password.test(data), {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    }),
    confirmPassword: z.string()
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        return ctx.addIssue({
            path: ['confirmPassword'],
            message: 'password and confirm password is not match'
        })
    }
})

export const changePasswordValidator = z.object({
    currentPassword: z.string().min(1, {
        message: 'Current password is required'
    }),
    newPassword: z.string().min(8, {
        message: 'Password is required'
    }).refine(data => passwordRegex.test(data), {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character and must be at least 8 characters long'
    }),
    confirmPassword: z.string(),
}).superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
        return ctx.addIssue({
            path: ['confirmPassword'],
            message: 'password and confirm password must be same'
        })
    }
})