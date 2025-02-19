"use client";
import { GroupProfileNavigator } from "@/components/group-profile/navigator";
import GroupInfoContextProvider from "./context/useGroupInfoContext";

export default function GroupProfileLayout({ children }) {
  return (
    <>
      <GroupInfoContextProvider>
        <div className="submissionSidebar flex justify-start items-start flex-col lg:flex-row lg:w-auto lg:h-full gap-5 h-auto">
          <div className="absolute left-0 right-0 lg:left-auto lg:right-auto lg:bottom-0 lg:top-0 lg:py-5 z-20 min-w-[280px]">
            <GroupProfileNavigator />
          </div>
          <div className="mt-14 lg:mt-0 lg:absolute right-0 top-0 left-0 lg:left-[36rem] bottom-0 no-scrollbar w-full lg:w-auto">
            <div className="overflow-y-scroll h-full pt-5 lg:pr-5 w-full lg:w-auto">
              {children}
            </div>
          </div>
        </div>
      </GroupInfoContextProvider>
    </>
  );
}
