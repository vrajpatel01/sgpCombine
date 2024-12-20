import { useQuery } from "@tanstack/react-query"
import { groupSubmissionData, weekInfo } from "./api"

export const useWeekInfo = () => {
    return useQuery({
        queryFn: () => weekInfo(),
        queryKey: ['totalWeeksInfo'],
    })
}

export const useGetGroupSubmissionData = ({ groupId, week }) => {
    return useQuery({
        queryFn: () => groupSubmissionData({ groupId, week }),
        queryKey: ['weekInfo', 'week-dates', week],
    })
}