import { useMutation } from "@tanstack/react-query"
import { sendEmailReminderToStudentsWhoNotJoinedAnyGroup } from "./api"

export const useSendRemindersToStudentsWhoNotJoinedAnyGroup = () => {

    return useMutation({
        mutationFn: sendEmailReminderToStudentsWhoNotJoinedAnyGroup,
        mutationKey: ['sendReminderToStudentWhoNotJoinedAnyGroup']
    })
}