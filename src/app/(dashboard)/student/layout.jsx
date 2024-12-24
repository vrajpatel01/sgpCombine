'use client'
import { Navigator } from "@/components/navigation/studentNavigator";
import Logo from "@/components/shared/logo";
import { SessionProvider, useSession } from "next-auth/react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ROLES } from "@/utils/role";
import { Toaster } from "@/components/ui/toaster";
import NavigationItem from "@/components/navigation/navigationItem";
import { IoMdContact } from "react-icons/io";

export default function MainLayout({ children }) {
    const [sidebar, setSidebar] = useState(false);
    const session = useSession();
    const user = session?.data?.user;
    const router = useRouter()
    const pathname = usePathname();

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
                    <div className="left-full bg-white w-full sm:w-auto pt-3 flex flex-col justify-between h-full">
                        <Navigator />
                        <div className="w-full space-y-3">
                            <NavigationItem
                                href="/contact-us"
                                title="Contact us"
                                icon={<IoMdContact />}
                                activeIcon={<IoMdContact />}
                                active={pathname == '/contact-us' ? true : false} />
                            <Button onClick={() => signOut()} variant="destructive" className="sm:w-[230px]">
                                Logout
                            </Button>
                        </div>
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