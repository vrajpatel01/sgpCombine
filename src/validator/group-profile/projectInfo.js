import * as z from 'zod'

export const projectInfoSchema = z.object({
    title: z.string().min(1, {
        message: 'Title is required'
    }),
    abstract: z.string().min(100, {
        message: 'this field is required minimum 100 characters'
    }),
    projectObjectiveAndScope: z.string().min(100, {
        message: 'this field is required minimum 100 characters'
    }),
    backgroundStudyOfExistingSystem: z.string().min(100, {
        message: 'this field is required minimum 100 characters'
    }),
    methodologyAndApproach: z.string().min(100, {
        message: 'this field is required minimum 100 characters'
    }),
    tentativeProjectPlan: z.string().min(100, {
        message: 'this field is required minimum 100 characters'
    }),
    individualRole: z.string().min(10, {
        message: 'this field is required minimum 10 characters'
    }),
    innovation: z.string().min(50, {
        message: 'this field is required minimum 50 characters'
    }),
    expectedOutcome: z.string().min(50, {
        message: 'this field is required minimum 50 characters'
    }),
    typeOfProject: z.string().min(1, {
        message: 'Type of Project is required'
    }),
    typeOfApplication: z.string().min(1, {
        message: 'Type of Application is required'
    }),
    domain: z.string(),
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