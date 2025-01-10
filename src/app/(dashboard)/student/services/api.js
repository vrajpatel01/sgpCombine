import axiosInstance from "@/axios.config"
import { getSession } from "next-auth/react"

export const getOnboardingStatus = async () => {
    const session = await getSession();
    return (await axiosInstance.get('/student/onboarding',{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.token}`,
        }
    })).data
}

export const updateOnboardingStatus = async () => {
    const session = await getSession();
    return (await axiosInstance.patch('/student/done-onboarding',{},{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.token}`,
        }
    })).data
}