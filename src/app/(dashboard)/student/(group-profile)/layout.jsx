"use client";
import { GroupProfileNavigator } from "@/components/group-profile/navigator";
import GroupInfoContextProvider from "./context/useGroupInfoContext";

export default function GroupProfileLayout({ children }) {
  return (
    <>
      <GroupInfoContextProvider>
        <div className="submissionSidebar flex justify-start items-start flex-col lg:flex-row lg:w-auto h-auto lg:h-full gap-5">
          <div className="absolute left-0 right-0 lg:left-auto lg:right-auto lg:bottom-0 lg:top-0 lg:py-5 z-20 min-w-[280px]">
            <GroupProfileNavigator />
          </div>
          <div className="w-full lg:ml-[18.4rem] mt-20 lg:mt-0">{children}</div>
        </div>
      </GroupInfoContextProvider>
    </>
  );
}
