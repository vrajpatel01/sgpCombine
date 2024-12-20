'use client';
//components
import NavigationItem from "./navigationItem";
import { usePathname } from "next/navigation";

// icons
// dashboard
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


export default function Navigator() {
    const pathname = usePathname();
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 sm:w-[230px]">
                <NavigationItem
                    href="/coordinator"
                    title="Students"
                    icon={<PiStudent />}
                    activeIcon={<PiStudentFill />}
                    active={pathname === '/coordinator'}
                />
                <NavigationItem
                    href="/coordinator/faculty"
                    title="Faculty"
                    icon={<IoPeopleOutline />}
                    activeIcon={<IoPeopleSharp />}
                    active={pathname === '/coordinator/faculty'}
                />
                <NavigationItem
                    href="/coordinator/groups"
                    title="Groups"
                    icon={<PiUsersFour />}
                    activeIcon={<PiUsersFourFill />}
                    active={pathname === '/coordinator/groups'}
                />
                <NavigationItem
                    href="/coordinator/assign"
                    title="Assign"
                    icon={<PiFlowArrow />}
                    activeIcon={<PiFlowArrowFill />}
                    active={pathname.match('/coordinator/assign')}
                />
                <NavigationItem
                    href="/coordinator/weekly-reports"
                    title="Weekly Reports"
                    icon={<HiOutlineDocumentReport />}
                    activeIcon={<HiDocumentReport />}
                    active={pathname.match('/coordinator/weekly-reports')}
                />
                <NavigationItem
                    href="/coordinator/settings"
                    title="Settings"
                    icon={<TbSettings />}
                    activeIcon={<TbSettingsFilled />}
                    active={pathname.match('/coordinator/settings')}
                />
            </div>
        </div>
    )
}