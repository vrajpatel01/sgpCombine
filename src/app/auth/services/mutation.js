import { useMutation } from "@tanstack/react-query";
import { forgotPassword, otpValidation, signUp } from "./api";

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: (email) => forgotPassword(email),
    })
}

export const useOtpValidation = () => {
    return useMutation({
        mutationFn: (data) => otpValidation(data.email, data.otp),
    })
}

export const useSignUp = () => {
    return useMutation({
        mutationFn: (data) => signUp(data.email, data.password),
    })
}