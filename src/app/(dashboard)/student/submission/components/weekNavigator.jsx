'use client'
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";


export const WeekNavigator = ({ totalWeeks }) => {
    // const totalWeeks = useGetWeekInformation()
    const weeks = totalWeeks?.data?.data?.totalWeeks || 0;
    const currentWeek = totalWeeks?.data?.data?.currentWeek || 0;

    if (totalWeeks.isPending) {
        return <div className='w-full space-y-3'>
            {Array.from({ length: 5 }, (_, i) => {
                return <Skeleton key={i} className='w-full h-10' />
            })}
        </div>
    }

    return (
        <nav className="bg-white border-[.5px] border-border p-3 lg:p-5 rounded-md w-full lg:w-auto lg:min-w-max h-full flex lg:flex-col flex-row gap-5 overflow-x-auto" x-chunk="dashboard-04-chunk-0">
            {
                Array.from({ length: weeks }, (_, i) => {
                    return <WeekNavigatorItem key={i} title={`Week ${i + 1} ${i == 0 ? ' - Group formation' : ''}`} link={i >= currentWeek ? undefined : `/student/submission/week-${i + 1}`} />
                })
            }
        </nav>
    )
}

export const WeekNavigatorItem = ({ title, link }) => {
    const pathname = usePathname()
    const isActive = new RegExp(`^${link}$|^${link}/.*$`, 'i');

    return (
        <LinkWrapper className={cn("flex justify-between items-center py-2 px-4 rounded-md select-none hover:bg-[#F3F3F3] transition-all duration-300 ease-in-out whitespace-nowrap", {
            "bg-[#F3F3F3]": isActive.test(pathname),
            "text-gray-400": link === undefined || link === ''
        })} href={link}>{title}</LinkWrapper>
    )
}

export const LinkWrapper = ({ href, children, ...props }) => {
    if (href === undefined || href === '') {
        return <button href='' {...props}>{children}</button>
    }

    return <Link {...props} href={href}>
        <button>{children}</button>
    </Link>
}