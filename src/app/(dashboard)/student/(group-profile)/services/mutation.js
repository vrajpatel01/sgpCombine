import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGroupMember, removeGroupMember, setGroupLock, setProjectDetails, updateProjectDetails, verifyGroupMember } from "./api";

export const useSetProjectDetails = () => {
    return useMutation({
        mutationFn: (data) => setProjectDetails(data),
    })
}

export const useUpdateProjectDetails = () => {
    return useMutation({
        mutationFn: (data) => updateProjectDetails(data),
    })
}

export const useAddGroupMember = () => {
    return useMutation({
        mutationFn: (data) => addGroupMember(data),
    })
}

export const useVerifyGroupMember = () => {
    return useMutation({
        mutationFn: (data) => verifyGroupMember(data),
    })
}

export const useRemoveGroupMember = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => removeGroupMember(data),
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries('group-members')
            }
        }
    })
}

export const useSetGroupLock = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => setGroupLock(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries('project-details');
        }
    })
}