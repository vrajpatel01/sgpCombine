import { useQuery } from "@tanstack/react-query"
import { getAllGroups, getAllGroupsCoordinator, getOneGroup } from "./api"

export const useGetAllGroups = (week) => {
    return useQuery({
        queryKey: ['allGroups'],
        queryFn: () => getAllGroups(week),
    })
}

export const useGetAllGroupsCoordinator = () => {
    return useQuery({
        queryKey: ['allGroups-coordinator'],
        queryFn: () => getAllGroupsCoordinator(),
        enabled: false,
    })
}

export const useOneGroup = (groupId) => {
    return useQuery({
        queryKey: ['group', groupId],
        queryFn: () => getOneGroup(groupId),
    })
}