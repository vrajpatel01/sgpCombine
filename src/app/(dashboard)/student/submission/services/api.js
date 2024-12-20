import axiosInstance from "@/axios.config";
import { getSession } from "next-auth/react";

export const getWeekInformation = async () => {
    const session = await getSession();
    return (await axiosInstance.get('/student/total-weeks', {
        headers: {
            Authorization: `Bearer ${session?.user?.token}`
        }
    })).data
}

export const saveWeekInformation = async (data) => {
    const session = await getSession()
    return (await axiosInstance.post('/student/week-info',data,{
        headers: {
            "Context-type": 'Application/Json',
            Authorization: `Bearer ${session?.user?.token}`
        }
    })).data
}

export const editWeekInformation = async (week, data)=>{
    const session = await getSession();
    return (await axiosInstance.patch(`/student/week-info/${week}`,data,{
        headers: {
            "Context-type": 'Application/Json',
            Authorization: `Bearer ${session?.user?.token}`
        }
    })).data
}

export const getWeeklySubmissionData = async (week) => {
    const session = await getSession()
    // return (await axiosInstance.get(`/student/week-info/${week}`,{
    return (await axiosInstance.get(`/student/week-info/${week}`,{
        headers: {
            Authorization: `Bearer ${session?.user?.token}`
        }
    })).data
}