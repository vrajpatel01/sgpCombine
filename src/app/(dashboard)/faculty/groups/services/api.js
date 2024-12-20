import { getSession } from "next-auth/react";
import axiosInstance from "@/axios.config";

export const getAllGroups = async (week) => {
    const session = await getSession();
    const url = week ? `/faculty/all-groups?week=${week}` : "/faculty/all-groups";
    return (await axiosInstance.get(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}

export const getOneGroup = async (groupId) => {
    const session = await getSession();
    return (await axiosInstance.get(`/faculty/group/${groupId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}

export const getAllGroupsCoordinator = async () => {
    const session = await getSession();
    return (await axiosInstance.get("/coordinator/all-groups", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}