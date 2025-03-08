import { useQuery } from "@tanstack/react-query"
import { getGroupSubmissionStatus } from "./api"

export const useGetGroupSubmissionStatus = () => {
    return useQuery({
        queryKey: ['get-group-submission-status'],
        queryFn: getGroupSubmissionStatus,
    })
}