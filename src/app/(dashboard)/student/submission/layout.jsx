'use client';
import * as React from "react";
import { useEffect } from "react";
import { notFound, usePathname } from "next/navigation";
import { ErrorComp } from "@/components/error";
import { CircleX } from "lucide-react";
import { WeekNavigator } from "./components/weekNavigator";
import { SubmissionSkeleton } from "./components/submissionSkeleton";
import { useGetWeekInformation } from "./services/query";
import { useGetProjectDetails } from "../(group-profile)/services/query";
import SubmissionContextProvider from "./context/submissionContext";


export default function SubmissionLayout({ children }) {
    const pathname = usePathname()
    const weekInfo = useGetWeekInformation()
    const currentWeek = weekInfo?.data?.data?.currentWeek || 0;
    const error = weekInfo?.error?.response;
    const projectDetails = useGetProjectDetails()

    const inGroup = projectDetails?.error?.response?.status != 400 || !!projectDetails?.data;

    useEffect(() => {
        if (weekInfo.isSuccess && (parseInt(pathname.charAt(pathname.length - 1)) > currentWeek)) {
            return notFound();
        }
    }, [weekInfo.isSuccess, weekInfo.isPending, weekInfo.isError, currentWeek, pathname]);

    return (
        <SubmissionContextProvider>
            {error?.status == 401 ? <ErrorComp icon={<CircleX size={42} />} text='Please try again later' /> :
                !inGroup ? <ErrorComp className='h-full' icon={<CircleX size={42} />} text='You are not in a group' /> :
                    <>
                        <div className="absolute left-0 right-0 lg:left-auto lg:right-auto lg:bottom-0 lg:top-0 lg:py-5 z-20 min-w-[280px]">
                            <WeekNavigator totalWeeks={weekInfo} />
                        </div>
                        <div className="lg:ml-[18.4rem] mt-24 lg:mt-0">
                            {weekInfo.isPending || projectDetails.isPending ?
                                <SubmissionSkeleton /> :
                                children}
                        </div>
                    </>}
        </SubmissionContextProvider>
    )
}