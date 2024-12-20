import { useQuery } from "@tanstack/react-query"
import { getGroupSubmissionData, getWeekInfo } from "./api"

export const useGetWeekInfo = () => {
    return useQuery({
        queryKey: ['weekInfo'],
        queryFn: () => getWeekInfo(),
    })
}

export const useGetGroupSubmissionData = (data) => {
    return useQuery({
        queryKey: ['groupSubmissionData', data.week, data.groupId],
        queryFn: () => getGroupSubmissionData(data.week, data.groupId),
    })
}