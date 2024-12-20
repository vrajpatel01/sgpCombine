import axiosInstance from "@/axios.config";
import { getSession } from "next-auth/react";

export const setProjectDetails = async (data) => {
    const session = await getSession();
    return (await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/student/project-info`, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data;
}

export const getProjectDetails = async (data) => {
    const session = await getSession();
    return (await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/student/project-info`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data;
}

export const updateProjectDetails = async (data) => {
    const session = await getSession();
    return (await axiosInstance.patch(`${process.env.NEXT_PUBLIC_API_URL}/student/project-info`, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data;
}

export const getGroupMembers = async () => {
    const session = await getSession();
    return (await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/student/group-members`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data;
}

export const addGroupMember = async (data) => {
    const session = await getSession();
    return (await axiosInstance.patch(`${process.env.NEXT_PUBLIC_API_URL}/student/group-members`, {
        email: data
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data;
}
export const verifyGroupMember = async (data) => {
    const session = await getSession();
    return (await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/student/group-members/verify`, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data;
}
export const removeGroupMember = async (email) => {
    const session = await getSession();
    return (await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_URL}/student/group-members/${email}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data;
}

export const getGroupSelectionDates = async () => {
    const session = await getSession();
    return (await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/student/group-selection-dates`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data;
}

export const setGroupLock = async () => {
    const session = await getSession();
    return (await axiosInstance.patch(`${process.env.NEXT_PUBLIC_API_URL}/student/lock-group`, {}, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data;
}

export const generateCertificate = async () => {
    const session = await getSession();
    return (await axiosInstance.get(`/student/generate-certificate`, {
        headers: {
            // "Content-Type": "application/pdf",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    }))
}

export const generateCoverPage = async () => {
    const session = await getSession();
    return (await axiosInstance.get(`/student/generate-cover`, {
        headers: {
            // "Content-Type": "application/pdf",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    }))
}