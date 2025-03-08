import axiosInstance from "@/axios.config";
import { getSession } from "next-auth/react"

export const sendReminderToGroupsWhoNotSubmittedWeeklyReport = async () => {
    const session = await getSession();
    return (await axiosInstance.post("/faculty/send-email-reminders", {}, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}

export const getGroupSubmissionStatus = async () => {
    const session = await getSession();
    return (await axiosInstance.get("/faculty/group-submission-status/my-groups", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}