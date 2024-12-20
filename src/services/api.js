import axiosInstance from "@/axios.config"
import { getSession } from "next-auth/react"

export const getAllInstitutes = async () => {
    return (await axiosInstance.get('/public/institutes')).data
}

export const getDepartment = async (instituteId) => {
    return (await axiosInstance.get(`/public/departments/${instituteId}`)).data
}