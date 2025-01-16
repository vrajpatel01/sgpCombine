import { useMutation } from "@tanstack/react-query"
import { updateGroupLockStatus } from "./api"

export const useUpdateGroupLockStatus = () => {
    return useMutation({
        mutationFn: ({ groupId, status }) => updateGroupLockStatus(groupId, status),
        mutationKey: ['updateGroupLockStatus'],
    })
}