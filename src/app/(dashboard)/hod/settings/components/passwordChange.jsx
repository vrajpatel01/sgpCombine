'use client'
import toast from "react-hot-toast";

import { Warper } from "./warper";
import { useChangePassword } from "../services/mutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import passwordValidator from "@/services/validator/password";

export default function PasswordChange() {
    const changePassword = useChangePassword();

    const form = useForm({
        resolver: zodResolver(passwordValidator),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    })

    const onSubmit = (value) => {
        changePassword.mutate({
            currentPassword: value.currentPassword,
            newPassword: value.newPassword
        }, {
            onSuccess: (data) => {
                if (data.success) {
                    form.reset();
                    return toast.success(data.message)
                }
            },
            onError: (error) => {
                return toast.error(error?.response?.data?.message || error?.message || 'Having some issue please try again later');
            }
        })
    }
    return (
        <Warper title='Personal Information' description="You can update your personal information from here.">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    <div className="py-3 flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>current password</FormLabel>
                                    <FormControl>
                                        <PasswordInput {...field} placeholder="•••••••••" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>new password</FormLabel>
                                    <FormControl>
                                        <PasswordInput {...field} placeholder="•••••••••" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>confirm password</FormLabel>
                                    <FormControl>
                                        <PasswordInput {...field} placeholder="•••••••••" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <div className="flex justify-end items-center">
                            <Button isLoading={changePassword.isPending} disabled={changePassword.isPending} type="submit">
                                Change
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </Warper>
    )
}