"use client";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

// components
import { Button } from "@/components/ui/button";

// network
import { useSignUp } from "../services/mutation";
import { signIn } from "next-auth/react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerValidator } from "@/validator/auth.validator";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { AxiosError } from "axios";

export default function SignUpScreen() {
    const router = useRouter()
    const signUp = useSignUp()

    const form = useForm({
        resolver: zodResolver(registerValidator),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        }
    })
    const onSubmit = (value) => {
        signUp.mutate({ email: value.email, password: value.password }, {
            onError: (error) => {
                if (error instanceof AxiosError) {
                    return toast.error(error.response.data?.message)
                }
                toast.error('Failed to send OTP. Please try again.');
            },
            onSuccess: (data) => {
                if (data.success) {
                    toast.success('Account created successfully. redirecting...');
                    signIn('credentials', {
                        email: value.email,
                        password: value.password,
                        redirect: false,
                        callbackUrl: '/'
                    }).then(e => {
                        if (e.ok) {
                            router.replace(e.url)
                        }
                    })
                }
            }
        })
    }

    return (
        <div className="flex flex-col gap-8 w-full sm:min-w-[350px]">
            <div className="mx-auto flex justify-center flex-col gap-3">
                <h1 className="text-4xl mt-10 font-bold text-center">Register</h1>
                <p className="text-base text-muted-foreground text-center">Enter your email id and password to create your account</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="gap-3 flex flex-col" noValidate>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg">Email</FormLabel>
                                <FormControl>
                                    <Input className="w-full h-14 text-xl" {...field} placeholder="example@example.com" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg">Password</FormLabel>
                                <FormControl>
                                    <PasswordInput className="w-full h-14 text-xl" {...field} placeholder="•••••••••" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg">Confirm Password</FormLabel>
                                <FormControl>
                                    <PasswordInput className="w-full h-14 text-xl" {...field} placeholder="•••••••••" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    {form.formState.errors.password && <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>}
                    <Button
                        className="text-xl h-12"
                        disabled={signUp.isPending}
                        isLoading={signUp.isPending} >
                        Sign Up
                    </Button>
                    <div className="flex justify-center text-base">
                        <span>Already have an account? <Link href="/auth/login" className="underline">Login</Link></span>
                    </div>
                </form>
            </Form>
        </div>
    );
}