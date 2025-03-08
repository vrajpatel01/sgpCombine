import { useMutation } from "@tanstack/react-query";
import { sendReminderToGroupsWhoNotSubmittedWeeklyReport } from "./api";

export const useSendReminderToGroupsWhoNotSubmittedWeeklyReport = () => {
    return useMutation({
        mutationFn: sendReminderToGroupsWhoNotSubmittedWeeklyReport,
        mutationKey: ['send-reminder-to-groups-who-not-submitted-weekly-report'],
    })
}