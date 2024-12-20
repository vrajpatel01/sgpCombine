'use client'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import InputField from "@/components/shared/inputField";
import { MdModeEditOutline } from "react-icons/md";
import { Warper } from "./warper";
import { IoLockClosed } from "react-icons/io5";
import passwordValidator from "@/services/validator/password";
import { useChangePassword } from "../services/mutation";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";

export default function PasswordChange() {
    const changePassword = useChangePassword()
    const [isChanged, setIsChanged] = useState(false)
    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handleFormSubmit = (e) => {
        e.preventDefault()
        try {
            const validateNewPassword = passwordValidator(password.newPassword);
            if (validateNewPassword && password.newPassword === password.confirmPassword) {
                const data = {
                    currentPassword: password.currentPassword,
                    newPassword: password.newPassword
                }
                changePassword.mutate(data, {
                    onSuccess: () => {
                        toast.success('Password changed successfully.')
                        setPassword({
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                        })
                    }
                })
            }
        } catch (error) {
            return toast.error(error.message);
        }
    }

    useEffect(() => {

        const delayDebounceFn = setTimeout(() => {
            if (password.currentPassword === password.newPassword && password.newPassword.length > 0) {
                toast.error('New password can not be the same as the current password.')
            }
        }, 1000)
        if (password.newPassword === password.confirmPassword &&
            password.newPassword.length > 0 && password.currentPassword.length > 0 &&
            password.currentPassword !== password.newPassword) {
            setIsChanged(true)
        } else {
            setIsChanged(false)
        }

        return () => clearTimeout(delayDebounceFn)
    }, [password])
    return (
        <Warper title='Personal Information' description="You can update your personal information from here.">
            <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                <div className="py-3 flex flex-col gap-4">
                    <div>
                        <Label htmlFor="currentPassword">current password</Label>
                        <PasswordInput
                            id="currentPassword"
                            placeholder='•••••••••'
                            value={password.currentPassword}
                            onChange={e => setPassword({ ...password, currentPassword: e.target.value })} />
                    </div>
                    <div>
                        <Label htmlFor="newPassword">new password</Label>
                        <PasswordInput
                            id="newPassword"
                            placeholder='•••••••••'
                            value={password.newPassword}
                            onChange={e => setPassword({ ...password, newPassword: e.target.value })} />
                    </div>
                    <div>
                        <Label htmlFor="confirmPassword">confirm password</Label>
                        <PasswordInput
                            id="confirmPassword"
                            placeholder='•••••••••'
                            value={password.confirmPassword}
                            onChange={e => setPassword({ ...password, confirmPassword: e.target.value })} />
                    </div>
                    <div className="flex justify-end items-center">
                        <Button
                            disabled={!isChanged || changePassword.isPending}
                            isLoading={changePassword.isPending} >
                            Change
                        </Button>
                    </div>
                </div>
            </form>
        </Warper>
    )
}