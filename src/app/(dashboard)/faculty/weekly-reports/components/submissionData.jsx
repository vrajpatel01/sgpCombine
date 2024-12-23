'use client'
import { useState } from "react";

import { Button } from "@/components/ui/button";
// import InputField from "@/components/shared/inputField";
import WorkDataViewer from "./workDataViewer";
import ReportRejectModel from "../models/reportRejectModel";
import { usePathname } from "next/navigation";
import { useGetGroupSubmissionData } from "../services/query";
import { BiError } from "react-icons/bi";
import { IoChevronBackSharp } from "react-icons/io5";
import Link from "next/link";
import { useChangeReportSubmissionStatus } from "../services/mutation";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


export default function SubmissionData() {
    const [isLoading, setIsLoading] = useState({
        accept: false,
        previews: false
    })
    const pathname = usePathname()
    const week = pathname.split('/')[3]
    const groupId = pathname.split('/')[4]
    const queryClient = useQueryClient();

    const groupData = useGetGroupSubmissionData({ week, groupId })
    const changeStatus = useChangeReportSubmissionStatus();
    const [rejectModel, setRejectModel] = useState(false)

    if (groupData.isPending) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <div className="border-black border-l-2 rounded-full w-14 h-14 animate-spin">
                </div>
            </div>
        )
    }
    const url = pathname.split('/').filter((path, index) => index !== 3).join('/')
    const statusChange = async (isLocked, allowPreviousEdit = false) => {
        const splitPath = pathname.split('/')
        const groupId = splitPath.pop();
        const week = splitPath[splitPath.length - 1]
        const data = {
            "isLocked": isLocked,
            "rejectMessage": "hello",
            "allowPreviousEdit": allowPreviousEdit
        }

        changeStatus.mutate({ groupId, week, data }, {
            onSuccess: async (data) => {
                if (data.success) {
                    await queryClient.invalidateQueries(['groupSubmissionData', week, groupId])
                    return toast.success(data?.message ?? 'Status changed successfully')
                }
                return toast.error(data.message);
            },
            onError: (error) => {
                return toast.error('Something went wrong');
            },
            onSettled: () => {
                setIsLoading({
                    accept: false,
                    previews: false
                })
            }
        })
    }
    const currentWeek = pathname.split('/')[2];
    if (!groupData.data || groupData.isError || groupData.data?.data === null) {
        return (
            <div className="w-full h-full flex justify-center items-center flex-col">
                <div className="flex justify-between sm:justify-start items-center gap-3 w-full">
                    <div className="flex justify-between items-center">
                        <Link href={url} className="p-2 rounded-full hover:bg-border text-center cursor-pointer">
                            <span><IoChevronBackSharp size={18} /></span>
                        </Link>
                        <h1 className="text-title-28 whitespace-nowrap flex flex-nowrap">Week {currentWeek}</h1>
                    </div>
                </div>
                <div className="bg-white shadow-sm rounded-md p-4 flex justify-center items-center text-center sm:text-left flex-col sm:flex-row gap-3 mt-10">
                    <BiError className="text-3xl sm:text-2xl" />
                    Group has not submitted the report for week {week}
                </div>
            </div>
        )
    }
    return (
        <div className="w-full space-y-5">
            <div className="header flex justify-between items-center flex-col sm:flex-row w-full gap-4">
                <div className="flex justify-between sm:justify-start items-center gap-3 w-full">
                    <div className="flex justify-between items-center">
                        <Link href={url} className="p-2 rounded-full hover:bg-border text-center cursor-pointer">
                            <span><IoChevronBackSharp size={18} /></span>
                        </Link>
                        <h1 className="text-title-28 whitespace-nowrap flex flex-nowrap">Week {currentWeek} <span className="hidden sm:block"> - {new Date(groupData.data?.data?.updatedAt).toDateString()}</span></h1>
                    </div>
                    <span className="capitalize border-border border-1 select-none px-3 py-2 rounded-md">{groupData.data?.data?.status}</span>
                </div>
                {groupData.data.data.isLocked && !(groupData.data?.data?.status === 'approved') &&
                    <div className="flex justify-end items-center gap-4 w-full">
                        {/* <span className="capitalize border-border border-1 px-3 py-2 rounded-md select-none sm:hidden">{groupData.data?.data?.status}</span> */}
                        <div className="flex justify-center items-center gap-4">
                            {currentWeek != "1" &&
                                <Button onClick={() => {
                                    setIsLoading({ ...isLoading, previews: true })
                                    return statusChange(false, true);
                                }}
                                    isLoading={isLoading.previews}
                                    disabled={isLoading.previews}>
                                    Previews allow
                                </Button>}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>
                                        Accept
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Accept the report</DialogTitle>
                                        <DialogDescription>Are you sure you want to accept this weekly report. after accepting this report you can not able to do any changes.</DialogDescription>
                                        <div className="flex justify-end">
                                            <Button
                                                type="button"
                                                onClick={() => {
                                                    setIsLoading({ ...isLoading, accept: true })
                                                    return statusChange(true);
                                                }}
                                                isLoading={isLoading.accept}
                                                disabled={isLoading.accept}>
                                                Accept
                                            </Button>
                                        </div>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                            <Button variant="destructive" onClick={() => setRejectModel(true)}>
                                Reject
                            </Button>
                        </div>
                    </div>}
            </div>

            <Tabs defaultValue="overall">
                <TabsList>
                    <TabsTrigger value="overall">Overall work</TabsTrigger>
                    <TabsTrigger value="members">Members work</TabsTrigger>
                    <TabsTrigger disabled={groupData?.data?.data?.rejectMessages.length === 0} value="rejection">Rejection</TabsTrigger>
                </TabsList>
                <TabsContent value="overall">
                    <form className="mt-5 w-full flex flex-col gap-4">
                        <WorkDataViewer
                            name="Expected Outcome as per Timeline"
                            workDone={groupData.data?.data?.expectedOutcome} />
                        <WorkDataViewer
                            name="Work Done"
                            workDone={groupData.data?.data?.workDone} />
                    </form>
                </TabsContent>
                <TabsContent value="members">
                    <form className="mt-5 w-full space-y-5">
                        {groupData.data?.data?.studentsWork.map((studentWork, index) => {
                            return <WorkDataViewer
                                name={studentWork.name}
                                email={studentWork.email}
                                workDone={studentWork.work} />
                        })}
                    </form>
                </TabsContent>
                <TabsContent value="rejection" className="space-y-5">
                    {groupData.data?.data?.rejectMessages.map((message, index) => (
                        <div key={index} className="bg-white p-4 rounded-md border-[.5px] border-border flex flex-col gap-4">
                            <div>{message.msg}</div>
                            <div className="text-gray-500 text-sm">{new Date(message.date).toDateString()}</div>
                        </div>
                    ))}
                </TabsContent>
            </Tabs>
            <Dialog open={rejectModel} onOpenChange={setRejectModel}>
                <ReportRejectModel model={rejectModel} setModel={setRejectModel} />
            </Dialog>
        </div>
    )
}