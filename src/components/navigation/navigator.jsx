'use client';
//components
import NavigationItem from "./navigationItem";
import { usePathname } from "next/navigation";

// icons
// dashboard
import { TbLayoutDashboard, TbLayoutDashboardFilled } from "react-icons/tb";
import { TbSettings, TbSettingsFilled } from "react-icons/tb";
// student
import { PiStudent, PiStudentFill } from "react-icons/pi";
// reports
import { HiDocumentReport, HiOutlineDocumentReport } from "react-icons/hi";
//assign
import { PiFlowArrow, PiFlowArrowFill } from "react-icons/pi";
// groups
import { PiUsersFourFill, PiUsersFour } from "react-icons/pi";
// faculty 
import { IoPeopleOutline, IoPeopleSharp } from "react-icons/io5";
// department
import { IoSchool, IoSchoolOutline } from "react-icons/io5";

import { useSession } from "next-auth/react";
import { Permissions } from "@/lib/permissions";


export default function Navigator() {
    const session = useSession();
    const user = session?.data?.user;

    if (session.status === 'loading') return null;
    const pathname = usePathname();
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 sm:w-[230px]">
                {Permissions.hasPermission(user?.role, 'dashboard:view') &&
                    <NavigationItem
                        href={`/${user?.role}`}
                        title="Dashboard"
                        icon={<TbLayoutDashboard />}
                        activeIcon={<TbLayoutDashboardFilled />}
                        active={pathname === `/${user?.role}`}
                    />}
                {Permissions.hasPermission(user?.role, 'student:view') &&
                    <NavigationItem
                        href={`/${user?.role}/student`}
                        title="Students"
                        icon={<PiStudent />}
                        activeIcon={<PiStudentFill />}
                        active={pathname === `/${user?.role}/student`}
                    />}
                {Permissions.hasPermission(user?.role, 'faculty:view') &&
                    <NavigationItem
                        href={`/${user?.role}/faculty`}
                        title="Faculty"
                        icon={<IoPeopleOutline />}
                        activeIcon={<IoPeopleSharp />}
                        active={pathname === `/${user?.role}/faculty`}
                    />}
                {Permissions.hasPermission(user?.role, 'groups:view-my') &&
                    <NavigationItem
                        href={`/${user?.role}/groups`}
                        title="Groups"
                        icon={<PiUsersFour />}
                        activeIcon={<PiUsersFourFill />}
                        active={pathname === `/${user?.role}/groups`}
                    />}
                {Permissions.hasPermission(user?.role, 'assign:manage') &&
                    <NavigationItem
                        href={`/${user?.role}/assign`}
                        title="Assign"
                        icon={<PiFlowArrow />}
                        activeIcon={<PiFlowArrowFill />}
                        active={pathname.match(`/${user?.role}/assign`)}
                    />}
                {Permissions.hasPermission(user?.role, 'reports:manage') &&
                    <NavigationItem
                        href={`/${user?.role}/weekly-reports`}
                        title="Weekly Reports"
                        icon={<HiOutlineDocumentReport />}
                        activeIcon={<HiDocumentReport />}
                        active={pathname.match(`/${user?.role}/weekly-reports`)}
                    />}
                {Permissions.hasPermission(user?.role, 'reports:manage') &&
                    <NavigationItem
                        href={`/${user?.role}/department`}
                        title="Department"
                        icon={<IoSchoolOutline />}
                        activeIcon={<IoSchool />}
                        active={pathname.match(`/${user?.role}/department`)}
                    />}
                <NavigationItem
                    href={`/${user?.role}/settings`}
                    title="Settings"
                    icon={<TbSettings />}
                    activeIcon={<TbSettingsFilled />}
                    active={pathname.match(`/${user?.role}/settings`)}
                />
            </div>
        </div>
    )
}