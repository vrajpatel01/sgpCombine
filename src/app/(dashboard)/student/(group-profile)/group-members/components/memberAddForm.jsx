import { EmailForm, MemberOTPVerifyForm, SuccessfullyMemberAdded } from "./form";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import {useState} from "react";


export const MemberAddForm = () => {
    const [stage, setStage] = useState(0)

    const memberEmailSchema = z.object({
        email: z.string().email()
    })

    const memberOTPVerifySchema = z.object({
        otp: z.string().length(6, {
            message: 'OTP is required'
        })
    })

    const emailForm = useForm({
        resolver: zodResolver(memberEmailSchema),
        defaultValues: {
            email: ''
        }
    })

    const otpForm = useForm({
        resolver: zodResolver(memberOTPVerifySchema),
        defaultValues: {
            otp: ''
        }
    })

    return (
        <div>
            {stage === 0 && <EmailForm setStage={setStage} form={emailForm} />}
            {stage === 1 && <MemberOTPVerifyForm setStage={setStage} form={otpForm} />}
            {stage === 2 && <SuccessfullyMemberAdded setStage={setStage} />}
        </div>
    )
}