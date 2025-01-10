"use client";
import Logo from "@/components/shared/logo";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ROLES } from "@/utils/role";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { StudentSidebar } from "@/components/sidebar/student-sidebar";
import { Dialog } from "@/components/ui/dialog";
import StudentOnBoding from "@/components/student-onbording";
import { useEffect, useState } from "react";
import { useGetOnboardingStatus } from "./services/query";

export default function MainLayout({ children }) {
  const session = useSession();
  const user = session?.data?.user;
  const router = useRouter();
  const onboardingStatus = useGetOnboardingStatus();
  const [onboarding, setOnboarding] = useState(false);

  useEffect(() => {
    if (onboardingStatus.isSuccess) {
      setOnboarding(onboardingStatus.data.onboarding);
    }
  }, [onboardingStatus.isSuccess]);

  if (session?.status === "loading") return null;
  if (user?.role !== ROLES.student.name) {
    return router.push(`/${user?.role}`);
  }

  return (
    <SessionProvider>
      <SidebarProvider>
        <StudentSidebar setOnboarding={setOnboarding} />
        <main className="w-full overflow-y-scroll h-screen space-y-y sm:space-y-0">
          <div className="sm:hidden flex justify-between items-center py-3 bg-white shadow-sm px-5 fixed w-full !z-50">
            <Logo />
            <SidebarTrigger />
          </div>
          <div className="p-5 mt-16 bg-secondary-background h-screen overflow-y-scroll">
            {children}
            <Dialog open={onboarding}>
              <StudentOnBoding setOnboarding={setOnboarding} />
            </Dialog>
          </div>
          <Toaster />
        </main>
      </SidebarProvider>
    </SessionProvider>
  );
}
