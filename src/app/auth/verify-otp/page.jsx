"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"
import { useRouter, useSearchParams } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// components
import { Button } from "@/components/ui/button"

// validator
import OtpInput from "react-otp-input";
import numberValidator from "@/services/validator/number";
import { useOtpValidation } from "../services/mutation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function VerifyOtpScreen(props) {
    const router = useRouter()
    const searchParams = useSearchParams();

    const otpVerification = useOtpValidation()

    const form = useForm({
        resolver: zodResolver(z.object({
            otp: z.string().min(6, {
                message: 'OTP must be 6 digits long.'
            }).max(6, {
                message: 'OTP must be 6 digits long.'
            })
        })),
        defaultValues: {
            otp: ''
        }
    })

    const onSubmit = (value) => {
        if (value.otp.length !== 6) {
            return form.setError('root', {
                message: 'OTP must be 6 digits long.'
            })
        }
        let email = searchParams.get('email');
        email = email.replace(/ /g, '+');
        otpVerification.mutate({ email, otp: value.otp }, {
            onSuccess: (data) => {
                toast.success('Password is Send to your email. Please check your email.')
                return router.push(`/auth/login`)
            },
            onError: (error) => {
                if (error instanceof AxiosError) {
                    return form.setError('root', {
                        message: error.response.data?.message
                    })
                }
                form.setError('root', {
                    message: 'Failed to verify OTP. Please try again.'
                })
            }
        })
    }

    useEffect(() => {
        let email = searchParams.get('email');
        email = email?.replace(/ /g, '+');
        if (!email) router.push(`/auth/forgot-password`)
    }, [props.searchParams.email, router]);
    return (
        <div className="flex flex-col gap-8 w-full sm:min-w-[350px]">
            <div className="mx-auto flex justify-center flex-col gap-3">
                <h1 className="text-4xl mt-10 font-bold text-center">Enter OTP</h1>
                <p className="text-base text-muted-foreground text-center">OTP is send to your email please enter OTP to reset your password so new password is send to your email.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="gap-3 flex flex-col justify-center items-center">
                    <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl className="flex justify-center">
                                    <InputOTP {...field} disabled={otpVerification.isPending} maxLength={6}>
                                        <InputOTPGroup>
                                            <InputOTPSlot className="text-2xl w-12 h-12 sm:w-16 sm:h-16" index={0} />
                                            <InputOTPSlot className="text-2xl w-12 h-12 sm:w-16 sm:h-16" index={1} />
                                            <InputOTPSlot className="text-2xl w-12 h-12 sm:w-16 sm:h-16" index={2} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot className="text-2xl w-12 h-12 sm:w-16 sm:h-16" index={3} />
                                            <InputOTPSlot className="text-2xl w-12 h-12 sm:w-16 sm:h-16" index={4} />
                                            <InputOTPSlot className="text-2xl w-12 h-12 sm:w-16 sm:h-16" index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <p className="w-full text-base leading-4 text-light-text text-center">Enter your OTP received on your registered email address. If the email is valid, we will send the password to your registered email address.</p>
                    {form.formState.errors.root && <FormMessage>{form.formState.errors.root.message}</FormMessage>}
                    <Button isLoading={otpVerification.isPending}
                        disabled={otpVerification.isPending}
                        className="text-xl h-12 w-full">
                        Reset
                    </Button>
                </form>
            </Form>
        </div>
    );
}