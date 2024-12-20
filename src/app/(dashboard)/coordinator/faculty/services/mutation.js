import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFaulty, assignCoordinator, createAccountWithCSV, deleteFacultyAccount, deleteMultipleFacultiesAccount, editFacultyAccount } from "./api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const useAddFaulty = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => addFaulty(data),
        onError: (error) => {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data.message)
            }
            return toast.error(error.message)
        },
        onSettled: async (data, error, variables) => {
            if (data.success === false) {
                toast.error(error.message)
            }
            if (data.success === true) {
                await queryClient.invalidateQueries({ queryKey: ['faculty'] })
                toast.success('Faculty added successfully')
            }
        }
    })
}


export const useDeleteFacultyAccount = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id) => deleteFacultyAccount(id),
        onError: (error) => {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            return toast.error(error.message)
        },
        onSettled: async (data, error, variables) => {
            toast.success(data.message)
            if (data.success === true) {
                await queryClient.invalidateQueries({ queryKey: ['faculty'] })
            }
        }
    })
}


export const useDeleteMultipleFacultyAccount = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (ids) => deleteMultipleFacultiesAccount(ids),
        onError: (error) => {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            return toast.error(error.message)
        },
        onSettled: async (data, error, variables) => {
            toast.success(data.message)
            if (data.success === true) {
                await queryClient.invalidateQueries({ queryKey: ['faculty'] })
            }
        }
    })
}

export const useEditFacultyAccount = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data) => editFacultyAccount(data),
        onError: (error) => {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            return toast.error(error.message)
        },
        onSettled: async (data, error, variables) => {
            toast.success(data.message)
            if (data.success === true) {
                await queryClient.invalidateQueries({ queryKey: ['faculty'] })
            }
        }
    })
}


export const useCreateAccountByCSV = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => createAccountWithCSV(data),
        mutationKey: ['createAccountByCSV'],
        onSuccess: async (data) => {
            if (data.success) {
                await queryClient.invalidateQueries(['hod', 'student', 'faculty'])
            }
        }
    })
}

export const useAssignCoordinator = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data) => assignCoordinator(data),
        onError: (error) => {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            return toast.error(error.message)
        },
        onSettled: async (data, error, variables) => {
            toast.success(data.message)
        }
    })
}