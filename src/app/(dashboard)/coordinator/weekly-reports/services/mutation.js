import { useMutation } from "@tanstack/react-query"
import { changeReportSubmissionStatus } from "./api"

export const useChangeReportSubmissionStatus = () => {
    return useMutation({
        mutationFn: ({ groupId, week, data }) => changeReportSubmissionStatus(groupId, week, data)
    })
}