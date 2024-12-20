import { useMutation } from "@tanstack/react-query";
import { editWeekInformation, saveWeekInformation } from "./api";

export const useSaveWeekInformation = () => {
    return useMutation({
        mutationFn: (data) => saveWeekInformation(data)
    })
}

export const useEditWeekInformation = () => {
    return useMutation({
        mutationFn: (data) => {
            return editWeekInformation(data.week, {
                expectedOutcome: data.expectedOutcome,
                workDone: data.workDone,
                studentsWork: data.studentsWork,
                isLocked: data.isLocked || false
            })
        }
    })
}