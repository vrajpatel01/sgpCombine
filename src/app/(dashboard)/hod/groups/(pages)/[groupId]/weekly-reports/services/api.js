import axiosInstance from "@/axios.config"
import { getSession } from "next-auth/react"

export const weekInfo = async () => {
    const session = await getSession();
    return (await axiosInstance.get('/hod/total-weeks', {
        headers: {
            "context-type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}


export const groupSubmissionData = async ({ groupId, week }) => {
    const session = await getSession();
    return (await axiosInstance.get(`/hod/week-info/${groupId}/${week}`, {
        headers: {
            "context-type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}