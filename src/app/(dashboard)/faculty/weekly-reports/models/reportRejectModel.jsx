'use client';
import { Button } from "@/components/ui/button";
import { useChangeReportSubmissionStatus } from "../services/mutation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";

export default function ReportRejectModel({ model, setModel }) {
    const pathname = usePathname();
    const [message, setMessage] = useState('');
    const changeStatus = useChangeReportSubmissionStatus();
    const queryClient = useQueryClient()
    const handleSubmit = () => {
        if (message.length == 0) {
            return toast.error('Please write feedback before rejecting this report')
        }
        const splitPath = pathname.split('/')
        const groupId = splitPath.pop();
        const week = splitPath[splitPath.length - 1]
        const data = {
            "isLocked": false,
            "rejectMessage": message,
            "allowPreviousEdit": false
        }

        changeStatus.mutate({ groupId, week, data }, {
            onSuccess: async (data) => {
                if (data.success) {
                    setModel(false);
                    return toast.success('Weekly report is rejected')
                }
                await queryClient.invalidateQueries(['groupSubmissionData', week, groupId])
                return toast.success(data.message);
            }
        })
    }
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Reject report</DialogTitle>
                <DialogDescription>Write the message why you are rejecting this report. this message is show to the students dashboard as well as send to the student via mail.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
                <Textarea rows={10}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}></Textarea>
                <div className="flex justify-end items-center gap-3">
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={changeStatus.isPending}
                        isLoading={changeStatus.isPending}>
                        Submit
                    </Button>
                </div>
            </div>
        </DialogContent>
    )
}