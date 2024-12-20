"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// components
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { loginValidator } from "@/validator/auth.validator";


export default function LoginScreen() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(loginValidator),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (value) => {
        setIsLoading(true)
        const status = await signIn('credentials', {
            email: value.email,
            password: value.password,
            redirect: false,
            callbackUrl: '/'
        })

        if (!status.ok && status.error !== null) {
            setIsLoading(false)
            return form.setError('root', {
                message: status.error
            })
        }
        // window.location.href = "/";
        router.replace(status.url)
        toast.success('Logged in successfully, redirecting...')
        setIsLoading(false)
    }
    return (
        <div className="flex flex-col gap-8 w-full sm:min-w-[350px]">
            <div className="mx-auto flex justify-center flex-col gap-3">
                <h1 className="text-4xl mt-10 font-bold text-center">Welcome</h1>
                <p className="text-base text-muted-foreground text-center">Please login to your account</p>
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
                    <p className="flex justify-end text-detail-14">
                        <Link href="/auth/forgot-password" className="text-base underline">Forgot Password?</Link>
                    </p>
                    {form.formState.errors.root && <FormMessage>{form.formState.errors.root.message}</FormMessage>}
                    <Button
                        className="text-xl h-12"
                        disabled={isLoading}
                        isLoading={isLoading} >
                        Log in
                    </Button>
                    <div className="flex justify-center text-base">
                        <span>Don&apos;t have an account? <Link href="/auth/signup" className="underline">Sign Up</Link></span>
                    </div>
                </form>
            </Form>
        </div>
    );
}