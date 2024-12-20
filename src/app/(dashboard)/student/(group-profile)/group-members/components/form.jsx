import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useAddGroupMember, useVerifyGroupMember } from "../../services/mutation";
import { CircleCheck, Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

let email = '';

export const EmailForm = ({ form, setStage }) => {
    const addMember = useAddGroupMember();
    const onSubmit = (value) => {
        addMember.mutate(value.email, {
            onSuccess: (data) => {
                if (data.success) {
                    email = value.email;
                    return setStage(1)
                }
                return form.setError('email', {
                    type: 'manual',
                    message: data.message
                })
            },
            onError: (error) => {
                if (!error?.response?.data?.success) form.setError('email', {
                    type: 'manual',
                    message: error?.response?.data?.message
                })
            }
        })
    }

    return (
        <div>
            <Form {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name="email"
                        controller={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder="Email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <div className="w-full flex justify-end items-center">
                        <Button disabled={addMember.isPending}>
                            {addMember.isPending &&
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export const MemberOTPVerifyForm = ({ form, setStage }) => {
    const verifyOtp = useVerifyGroupMember();
    const queryClient = useQueryClient();

    const onSubmit = (value) => {
        verifyOtp.mutate({ otp: value.otp, email }, {
            onSuccess: async (data) => {
                if (data.success) {
                    await queryClient.invalidateQueries('groupMembers')
                    return setStage(2)
                }
                return form.setError('otp', {
                    type: 'manual',
                    message: data.message
                })
            },
            onError: (error) => {
                if (!error?.response?.data?.success) form.setError('otp', {
                    type: 'manual',
                    message: error?.response?.data?.message
                })
            }
        })
    }

    return (
        <div>
            <Form {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name="otp"
                        controller={form.control}
                        render={({ field }) => (
                            <div className="flex justify-center items-center">
                                <FormItem>
                                    <FormControl >
                                        <InputOTP {...field} maxLength={6}>
                                            <InputOTPGroup>
                                                <InputOTPSlot className="p-6 text-lg" index={0} />
                                                <InputOTPSlot className="p-6 text-lg" index={1} />
                                                <InputOTPSlot className="p-6 text-lg" index={2} />
                                            </InputOTPGroup>
                                            <InputOTPSeparator />
                                            <InputOTPGroup>
                                                <InputOTPSlot className="p-6 text-lg" index={3} />
                                                <InputOTPSlot className="p-6 text-lg" index={4} />
                                                <InputOTPSlot className="p-6 text-lg" index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </div>
                        )} />
                    <div className="w-full flex justify-end items-center">
                        <Button disabled={verifyOtp.isPending}>
                            {verifyOtp.isPending &&
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export const SuccessfullyMemberAdded = () => {
    return (
        <div className="space-y-5 py-10">
            <div className="flex flex-col justify-center items-center gap-5">
                <CircleCheck size={42} />
                <p className="text-lg">Member added successfully</p>
            </div>
        </div>
    )
}