import { useQuery } from "@tanstack/react-query"
import { getAllGroups, getAllGroupsCoordinator, getOneGroup, getSubmissionStatusOfAllGroup } from "./api"

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

export const useGetSubmissionStatusOfAllGroup = () => {
    return useQuery({
        queryFn: getSubmissionStatusOfAllGroup,
        queryKey: ['submission-status-of-all-group'],
    })
}