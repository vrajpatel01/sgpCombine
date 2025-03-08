import axiosInstance from "@/axios.config";
import { getSession } from "next-auth/react"

export const sendReminderToGroupsWhoNotSubmittedWeeklyReport = async () => {
    const session = await getSession();
    return (await axiosInstance.post("/coordinator/send-email-reminders/groups-without-submission", {}, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}