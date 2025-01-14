"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Navigator } from "../navigation/studentNavigator";
import Logo from "../shared/logo";
import { IoMdContact } from "react-icons/io";
import NavigationItem from "../navigation/navigationItem";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { IoBook } from "react-icons/io5";
import { useOnboarding } from "@/app/(dashboard)/student/hook/useOnboarding";

export function StudentSidebar() {
  const pathname = usePathname();
  const { updateOnboarding } = useOnboarding();
  return (
    <Sidebar className="px-2 !bg-white">
      <SidebarHeader className="!mt-2 !bg-white">
        <Logo />
      </SidebarHeader>
      <SidebarContent className="!bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <Navigator />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="!bg-white">
        <div className="w-full space-y-3">
          <NavigationItem
            href={pathname}
            title="Tutorial"
            icon={<IoBook />}
            activeIcon={<IoBook />}
            onClick={() => updateOnboarding(4)}
            active={false}
          />
          <NavigationItem
            href="/student/contact-us"
            title="Contact us"
            icon={<IoMdContact />}
            activeIcon={<IoMdContact />}
            active={pathname == "/student/contact-us" ? true : false}
          />
          <Button
            onClick={() => signOut()}
            variant="destructive"
            className="w-full"
          >
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
