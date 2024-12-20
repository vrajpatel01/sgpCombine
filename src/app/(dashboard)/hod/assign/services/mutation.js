import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { assignGroup, degassingGroup } from "./api";

export const useAssignGroup = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => assignGroup(data),
        onSuccess: async (data) => {
            if (data.success === false) {
                toast.error(data.message)
            }
            if (data.success === true) {
                await queryClient.invalidateQueries('faculty-groups')
                await queryClient.invalidateQueries('pending-groups')
                await queryClient.invalidateQueries('faculty')
                toast.success(data.message)
            }
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            return toast.error(error.response?.data?.message || error.message)
        },
    })
}

export const useDeassignGroup = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => degassingGroup(data),
        onSuccess: async (data) => {
            if (data.success === false) {
                toast.error(data.message)
            }
            if (data.success === true) {
                await queryClient.invalidateQueries('faculty-groups')
                await queryClient.invalidateQueries('pending-groups')
                await queryClient.invalidateQueries('allGroups')
                toast.success(data.message)
            }
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            return toast.error(error.response?.data?.message || error.message)
        },
    })
}