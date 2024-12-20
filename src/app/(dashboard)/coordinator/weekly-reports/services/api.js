import axiosInstance from "@/axios.config"
import { getSession } from "next-auth/react"

export const getWeekInfo = async () => {
    const session = await getSession();
    return (await axiosInstance.get('/faculty/total-weeks', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.token}`
        }
    })).data
}

export const getGroupSubmissionData = async (week, groupId) => {
    const session = await getSession();
    return (await axiosInstance.get(`/faculty/week-info/${groupId}/${week}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.token}`
        }
    })).data
}

export const changeReportSubmissionStatus = async (groupId, week, data) => {
    const session = await getSession();
    return (await axiosInstance.patch(`/faculty/week-status/${groupId}/${week}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.token}`
        }
    })).data
}