'use client';
//components
import NavigationItem from "./navigationItem";
import { usePathname } from "next/navigation";

// dashboard
import { TbSettings, TbSettingsFilled } from "react-icons/tb";
// student
import { PiStudent, PiStudentFill } from "react-icons/pi";
// reports
import { HiDocumentReport, HiOutlineDocumentReport } from "react-icons/hi";
// groups
import { PiUsersFourFill, PiUsersFour } from "react-icons/pi";

export default function Navigator() {
    const pathname = usePathname();
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 sm:w-[230px]">
                <NavigationItem
                    href="/faculty"
                    title="Students"
                    icon={<PiStudent />}
                    activeIcon={<PiStudentFill />}
                    active={pathname === '/faculty'}
                />
                <NavigationItem
                    href="/faculty/groups"
                    title="Groups"
                    icon={<PiUsersFour />}
                    activeIcon={<PiUsersFourFill />}
                    active={pathname === '/faculty/groups'}
                />
                <NavigationItem
                    href="/faculty/weekly-reports"
                    title="Weekly Reports"
                    icon={<HiOutlineDocumentReport />}
                    activeIcon={<HiDocumentReport />}
                    active={pathname.match('/faculty/weekly-reports')}
                />
                <NavigationItem
                    href="/faculty/settings"
                    title="Settings"
                    icon={<TbSettings />}
                    activeIcon={<TbSettingsFilled />}
                    active={pathname.match('/faculty/settings')}
                />
            </div>
        </div>
    )
}