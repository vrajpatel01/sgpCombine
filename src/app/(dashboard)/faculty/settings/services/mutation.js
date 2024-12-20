import { useMutation } from "@tanstack/react-query"
import { changePassword } from "./api"

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (data) => changePassword(data),
        retry: 1,
        mutationKey: ['changePassword']
    })
}