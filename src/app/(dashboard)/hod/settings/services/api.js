import axiosInstance from "@/axios.config"
import { getSession } from "next-auth/react"

export const getMyInformation = async () => {
    const session = await getSession()

    return (await axiosInstance.get('/hod/me', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.token}`
        }
    })).data
}


export const changePassword = async (data) => {
    const session = await getSession()
    return (await axiosInstance.patch('/hod/change-password', data, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}