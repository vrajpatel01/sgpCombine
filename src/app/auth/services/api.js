import axiosInstance from "@/axios.config";

export const forgotPassword = async (email) => {
    return (await axiosInstance.patch('/public/auth/forgot-password', { email })).data
}

export const otpValidation = async (email, otp) => {
    return (await axiosInstance.post('/public/auth/forgot-password/verify', { email, otp })).data
}

export const signUp = async (email, password) => {
    return (await axiosInstance.post(`/public/auth/register`, {
        email,
        password,
        role: 'faculty'
    })).data
}