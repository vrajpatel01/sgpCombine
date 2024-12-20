import { useQuery } from "@tanstack/react-query"
import { getCategoryInfo, getProjectSubmissionInfo, getTechnologyInfo } from "./api"

export const useGetProjectSubmissionInfo = () => {
    return useQuery({
        queryFn: () => getProjectSubmissionInfo(),
        queryKey: ['chart', 'dashboard', 'projectSubmissionChart'],
    })
}


export const useGetTechnologyInfo = () => {
    return useQuery({
        queryFn: () => getTechnologyInfo(),
        queryKey: ['chart', 'dashboard', 'technologyChart'],
    })
}

export const useGetCategoryInfo = () => {
    return useQuery({
        queryFn: () => getCategoryInfo(),
        queryKey: ['chart', 'dashboard', 'categoryChart'],
    })
}