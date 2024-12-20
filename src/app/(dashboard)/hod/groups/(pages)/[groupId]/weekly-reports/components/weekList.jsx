'use client'
import NavigationItem from "@/components/navigation/navigationItem"
import { usePathname } from "next/navigation"
import Skeleton from "react-loading-skeleton";
import { useWeekInfo } from "../services/query";

export const WeekList = () => {
    const pathname = usePathname();
    const weeks = useWeekInfo();

    const totalWeeks = weeks.data?.data?.totalWeeks;
    const currentWeek = weeks.data?.data?.currentWeek;
    const groupId = pathname.split('/')[3];
    const selectWeek = pathname.split('/').filter((item) => item.length === 1)[0];

    const getUrl = (index) => {
        const url = pathname;
        const urlSplit = url.split('/');
        const groupId = urlSplit[urlSplit.length - 1];
        const week = urlSplit[urlSplit.length - 2];
        if (urlSplit.length <= 3) {
            return `/hod/weekly-reports/${index + 1}`
        } else {
            return `/hod/weekly-reports/${index + 1}/${groupId}`
        }
    }


    if (weeks.isPending) {
        return (
            <div className="bg-white border-[.5px] border-border p-3 lg:p-5 rounded-md w-full lg:w-auto lg:min-w-max h-full flex lg:flex-col flex-row gap-5 overflow-x-auto">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} height={40} width={230} />
                ))}
            </div>
        )
    }
    return (
        <div className="bg-white border-[.5px] border-border p-3 lg:p-5 rounded-md w-full lg:w-auto lg:min-w-max h-full flex lg:flex-col flex-row gap-5 overflow-x-auto">
            {Array.from({ length: totalWeeks }).map((_, index) => {
                return <NavigationItem
                    key={index}
                    href={`/hod/groups/${groupId}/weekly-reports/${index + 1}`}
                    title={`Week ${index + 1}`}
                    active={selectWeek == (index + 1)}
                    disabled={currentWeek < (index + 1)} />
            })}
        </div>
    )
}