import axiosInstance from "@/axios.config";
import { getSession } from "next-auth/react";

export const setSemesterDate = async (data) => {
    const session = await getSession()
    return (await axiosInstance.patch('/hod/semester-dates', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.token}`
        }
    })).data
}

export const getSemesterDate = async (data) => {
    const session = await getSession()
    return (await axiosInstance.get('/hod/semester-dates', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.token}`
        }
    })).data
}

export const setGroupSelectionDate = async (data) => {
    const session = await getSession()
    return (await axiosInstance.patch('/hod/group-selection-dates', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.token}`
        }
    })).data
}

export const getGroupSelectionDate = async () => {
    const session = await getSession()
    return (await axiosInstance.get('/hod/group-selection-dates', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.token}`
        }
    })).data
}

export const setGroupLimit = async (data) => {
    const session = await getSession()
    return (await axiosInstance.patch('/hod/group-limit', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.token}`
        }
    })).data
}

export const getGroupLimit = async () => {
    const session = await getSession()
    return (await axiosInstance.get('/hod/group-limit', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.token}`
        }
    })).data
}