import regex from "@/lib/regex";
import { z } from "zod";

export default z.object({
    name: z.string().min(3, {
        message: 'name should be 3 characters long'
    }),
    employeeNumber: z.string().min(6, {
        message: 'employee number should be 6 characters long'
    }),
    email: z.string().email({
        message: 'invalid email'
    }),
    phoneNumber: z.string().refine(data => regex.phone.test(data), {
        message: 'Enter valid phone number'
    }),
    designation: z.string().min(3, {
        message: 'designation should be 3 characters long'
    }),
    // subjectCode: z.string().min(3, {
    //     message: 'subject code should be 3 characters long'
    // }),
    // subjectName: z.string().min(3, {
    //     message: 'subject name should be 3 characters long'
    // })
})