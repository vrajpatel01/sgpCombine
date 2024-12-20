import { useQuery } from "@tanstack/react-query";
import { getAllGroups, getFacultyGroups, getOneGroup, getPendingGroups } from "./api";

export const useGetFacultyGroups = (facultyId) => {
    return useQuery({
        queryKey: ['facultyGroups', facultyId],
        queryFn: () => getFacultyGroups(facultyId),
    })
}

export const useGetPendingGroups = () => {
    return useQuery({
        queryKey: ['pendingGroups'],
        queryFn: () => getPendingGroups(),
    })
}

export const useGetAllGroups = () => {
    return useQuery({
        queryKey: ['allGroups'],
        queryFn: () => getAllGroups(),
    })
}

export const useOneGroup = (groupId) => {
    return useQuery({
        queryKey: ['allGroups', groupId],
        queryFn: () => getOneGroup(groupId),
    })
}