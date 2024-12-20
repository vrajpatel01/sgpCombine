import axiosInstance from "@/axios.config"
import { getSession } from "next-auth/react"

export const getProjectSubmissionInfo = async () => {
    const session = await getSession();
    let url = `/hod/dashboard`
    return (await axiosInstance.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}

export const getTechnologyInfo = async () => {
    const session = await getSession();
    let url = `/hod/technology-distribution`
    return (await axiosInstance.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}

export const getCategoryInfo = async () => {
    const session = await getSession();
    let url = `/hod/project-category-distribution`
    return (await axiosInstance.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}