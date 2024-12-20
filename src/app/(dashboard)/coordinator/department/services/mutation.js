import { useMutation } from "@tanstack/react-query";
import { setGroupLimit, setGroupSelectionDate, setSemesterDate } from "./api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const useSetSemesterDate = () => {
    return useMutation({
        mutationFn: (data) => setSemesterDate(data),
        onSuccess: (data) => {
            if (data.success === false) {
                toast.error(data.message)
            }
            if (data.success === true) {
                toast.success(data.message)
            }
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            return toast.error(error.response?.data?.message || error.message)
        }
    })
}

export const useSetGroupSelectionDate = () => {
    return useMutation({
        mutationFn: (data) => setGroupSelectionDate(data),
        onSuccess: (data) => {
            if (data.success === false) {
                toast.error(data.message)
            }
            if (data.success === true) {
                toast.success(data.message)
            }
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            return toast.error(error.response?.data?.message || error.message)
        }
    })
}

export const useSetGroupLimit = () => {
    return useMutation({
        mutationFn: (data) => setGroupLimit(data),
        onSuccess: (data) => {
            if (data.success === false) {
                toast.error(data.message)
            }
            if (data.success === true) {
                toast.success(data.message)
            }
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            return toast.error(error.response?.data?.message || error.message)
        }
    })
}
