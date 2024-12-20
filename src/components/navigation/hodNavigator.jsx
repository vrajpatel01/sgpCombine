//components
import NavigationItem from "./navigationItem";
import { usePathname } from "next/navigation";

// icons
// dashboard
import { TbLayoutDashboard, TbSettings, TbSettingsFilled } from "react-icons/tb";
import { TbLayoutDashboardFilled } from "react-icons/tb";
// student
import { PiStudent, PiStudentFill } from "react-icons/pi";
// faculty 
import { IoPeopleOutline, IoPeopleSharp } from "react-icons/io5";
// department
import { IoSchool, IoSchoolOutline } from "react-icons/io5";
// assign
import { PiFlowArrow, PiFlowArrowFill } from "react-icons/pi";
// groups
import { PiUsersFourFill, PiUsersFour } from "react-icons/pi";


export default function Navigator() {
    const pathname = usePathname();
    return (
        <div className="space-y-5">
            <div>
                {/* <div className="mb-3 text-light-text capitalize text-body-16"></div> */}
                <div className="flex flex-col gap-5">
                    <NavigationItem
                        href="/hod"
                        title="Dashboard"
                        icon={<TbLayoutDashboard />}
                        activeIcon={<TbLayoutDashboardFilled />}
                        active={pathname === '/hod'}
                    />
                    <NavigationItem
                        href="/hod/faculty"
                        title="Faculty"
                        icon={<IoPeopleOutline />}
                        activeIcon={<IoPeopleSharp />}
                        active={pathname.match('/hod/faculty')}
                    />
                    <NavigationItem
                        href="/hod/students"
                        title="Students"
                        icon={<PiStudent />}
                        activeIcon={<PiStudentFill />}
                        active={pathname.match('/hod/students')}
                    />
                </div>
            </div>
            <div>
                <div className="mb-3 text-light-text capitalize text-body-16 border-b-1 border-border"></div>
                <div className="flex flex-col gap-5">
                    <NavigationItem
                        href="/hod/assign"
                        title="Assign"
                        icon={<PiFlowArrow />}
                        activeIcon={<PiFlowArrowFill />}
                        active={pathname.match('/hod/assign')}
                    />
                    <NavigationItem
                        href="/hod/groups"
                        title="Groups"
                        icon={<PiUsersFour />}
                        activeIcon={<PiUsersFourFill />}
                        active={pathname.match('/hod/groups')}
                    />
                    <NavigationItem
                        href="/hod/department"
                        title="Department"
                        icon={<IoSchoolOutline />}
                        activeIcon={<IoSchool />}
                        active={pathname.match('/hod/department')}
                    />
                </div>
            </div>
            <div>
                <div className="mb-3 text-light-text capitalize text-body-16 border-b-1 border-border"></div>
                <div className="flex flex-col gap-5">
                    <NavigationItem
                        href="/hod/settings"
                        title="Settings"
                        icon={<TbSettings />}
                        activeIcon={<TbSettingsFilled />}
                        active={pathname.match('/hod/settings')}
                    />
                </div>
            </div>
        </div>
    )
}