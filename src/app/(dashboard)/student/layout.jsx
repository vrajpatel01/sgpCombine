'use client'
import { Navigator } from "@/components/navigation/studentNavigator";
import Logo from "@/components/shared/logo";
import { SessionProvider, useSession } from "next-auth/react";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { ROLES } from "@/utils/role";

export default function MainLayout({ children }) {
    const [sidebar, setSidebar] = useState(false);
    const session = useSession();
    const user = session?.data?.user;
    const router = useRouter()

    if (session?.status === 'loading') return null;
    if (user?.role !== ROLES.student.name) {
        return router.push(`/${user?.role}`)
    }

    return (
        <SessionProvider>
            <div className="md:flex justify-start items-start">
                <div className="absolute z-50 top-0 left-0 w-full bg-white p-6 flex justify-between items-center sm:hidden border-b-1 border-border">
                    <Logo />
                    <div className="cursor-pointer" onClick={() => setSidebar(!sidebar)}>
                    </div>
                </div>
                <div className={`z-30 fixed flex flex-col gap-5 justify-start items-start left-0 top-[5.3rem] sm:top-0 w-full h-auto sm:h-full sm:w-auto !bg-white p-6 border-r-1 border-border transition-all duration-150 ease-in-out ${sidebar ? 'left-0' : 'left-full'} sm:left-0`}>
                    <Logo className='hidden sm:block' />
                    <div className="left-full bg-white w-full sm:w-auto">
                        <Navigator />
                    </div>
                </div>
                <div className="px-6 py-8 sm:ml-[17.4rem] pt-28 sm:mb-0 sm:py-8 w-full h-screen bg-secondary-background overflow-x-auto">
                    {children}
                </div>
            </div>
            <Toaster />
        </SessionProvider>
    )
}