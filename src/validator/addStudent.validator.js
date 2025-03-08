import regex from "@/lib/regex";
import { z } from "zod";

export default z.object({
    name: z.string().min(3, {
        message: 'name should have more than 3 characters'
    }),
    rollNumber: z.string().min(3, {
        message: 'roll number should have more than 3 characters'
    }),
    email: z.string().email({
        message: 'invalid email'
    }),
    phoneNumber: z.string().refine(data => regex.phone.test(data), {
        message: 'Enter valid phone number'
    }),
    batch: z.string().min(1, {
        message: 'batch should have more than 1 characters'
    }),
    division: z.string().min(1, {
        message: 'division is required'
    })
})