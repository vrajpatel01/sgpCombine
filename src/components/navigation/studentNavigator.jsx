import { usePathname } from "next/navigation";

// dashboard
import { TbSettingsFilled, TbSettings } from "react-icons/tb";
import { HiMiniUserGroup, HiOutlineUserGroup } from "react-icons/hi2";
import { IoDocumentsOutline, IoDocuments } from "react-icons/io5";
import NavigationItem from "./navigationItem";
import { useGetProjectDetails } from "@/app/(dashboard)/student/(group-profile)/services/query";

export function Navigator() {
  const pathname = usePathname();
  const projectInfo = useGetProjectDetails();

  const groupProfile = [
    "/student",
    "/student/group-members",
    "/student/locking",
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        <NavigationItem
          href="/student"
          title="Group Profile"
          icon={<HiOutlineUserGroup />}
          activeIcon={<HiMiniUserGroup />}
          active={groupProfile.includes(pathname)}
        />
        <NavigationItem
          disabled={!projectInfo?.data?.data?.isLocked}
          href="/student/submission"
          title="Submission"
          icon={<IoDocumentsOutline />}
          activeIcon={<IoDocuments />}
          active={pathname.match("/student/submission")}
        />
        <NavigationItem
          href="/student/settings"
          title="Settings"
          icon={<TbSettings />}
          activeIcon={<TbSettingsFilled />}
          active={pathname.match("/student/settings")}
        />
      </div>
    </div>
  );
}
