import axiosInstance from "@/axios.config"
import { getSession } from "next-auth/react"

export const changePassword = async (data) => {
    const session = await getSession()
    return (await axiosInstance.patch('/faculty/change-password', data, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}

export const me = async () => {
    const session = await getSession()

    return (await axiosInstance.get('/faculty/me', {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}