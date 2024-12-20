'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const GroupProfileNavigator = React.forwardRef(({ ...props }, ref) => {
    return (
        // <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
        <nav className="bg-white border-[.5px] border-border p-3 lg:p-5 rounded-md w-full lg:w-auto lg:min-w-max h-full flex lg:flex-col flex-row gap-5 overflow-x-auto" x-chunk="dashboard-04-chunk-0">
            <GroupProfileNavigatorItem link='/student' title='Project Information' />
            <GroupProfileNavigatorItem link='/student/group-members' title='Group Members' />
            <GroupProfileNavigatorItem link='/student/locking' title='Lock Group' />
        </nav>
    )
})

const GroupProfileNavigatorItem = ({ link, title }) => {
    const pathname = usePathname()
    const isActive = new RegExp(`^${link}$|^${title}/.*$`, 'i');

    return (
        <Link className={cn("flex justify-between items-center py-2 px-4 rounded-md select-none hover:bg-[#F3F3F3] transition-all duration-300 ease-in-out whitespace-nowrap", {
            "bg-[#F3F3F3]": isActive.test(pathname)
        })} href={link}>{title}</Link>
    )
}

GroupProfileNavigator.displayName = 'GroupProfileNavigator'

export { GroupProfileNavigator, GroupProfileNavigatorItem }