import { useMutation } from "@tanstack/react-query";
import { changePassword } from "./api";

export function useChangePassword() {
    return useMutation({
        mutationFn: (data) => changePassword(data),
        mutationKey: ['changePassword'],
    })
}