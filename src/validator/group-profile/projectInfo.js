import * as z from 'zod'

export const projectInfoSchema = z.object({
    title: z.string().min(1, {
        message: 'Title is required'
    }),
    abstract: z.string().min(100, {
        message: 'Abstract required minimum 100 characters'
    }),
    typeOfProject: z.string().min(1, {
        message: 'Type of Project is required'
    }),
    typeOfApplication: z.string().min(1, {
        message: 'Type of Application is required'
    }),
    domain: z.string().min(1, {
        message: 'Domain is required'
    }),
    technologyAndTools: z.array(z.string()).superRefine((value, ctx) => {
        if (value.length < 1) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                type: "array",
                inclusive: true,
                message: "Technology and Tools is required",
            });
        }
    }),
    languages: z.array(z.string()).superRefine((value, ctx) => {
        if (value.length < 1) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                type: "array",
                inclusive: true,
                message: "Languages is required",
            });
        }
    }),
})