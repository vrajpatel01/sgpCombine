import { queryOptions, useQuery } from "@tanstack/react-query";
import { getWeekInformation, getWeeklySubmissionData } from "./api";


export const useGetWeekInformation = () => {
    return useQuery({
        queryKey: ['week-information'],
        queryFn: () => getWeekInformation(),
        ...queryOptions
    })
}

export const useGetWeeklySubmissionData = (week) => {
    return useQuery({
        queryKey: ['weekly-submission', week],
        queryFn: () => getWeeklySubmissionData(week),
        ...queryOptions
    })
}