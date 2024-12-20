import axiosInstance from "@/axios.config";
import { getSession } from "next-auth/react";

export const getFacultyGroups = async (facultyId) => {
    const session = await getSession();
    return (await axiosInstance.get(`/hod/faculty-groups/${facultyId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}

export const getPendingGroups = async () => {
    const session = await getSession();
    return (await axiosInstance.get(`/hod/pending-groups`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}

export const getAllGroups = async () => {
    const session = await getSession();
    return (await axiosInstance.get(`/hod/all-groups`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}

export const getOneGroup = async (groupId) => {
    const session = await getSession();
    return (await axiosInstance.get(`/hod/group/${groupId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}

export const assignGroup = async (data) => {
    const session = await getSession();
    return (await axiosInstance.patch(`/hod/assign-group/${data.facultyId}`, {
        groups: data.groups,
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}

export const degassingGroup = async (data) => {
    const session = await getSession();
    return (await axiosInstance.patch(`/hod/deassign-group`, {
        groups: [data]
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}