'use client'
import { useState } from "react";

// components
import { RxCross2 } from "react-icons/rx";

// icons 
import { LuMenu } from "react-icons/lu";
import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Navigator from "@/components/navigation/hodNavigator";
import { usePathname, useRouter } from "next/navigation";
import { ROLES } from "@/utils/role";
import NavigationItem from "@/components/navigation/navigationItem";
import { IoMdContact } from "react-icons/io";

export default function DashboardLayout({ children }) {
    const [sidebar, setSidebar] = useState(false)
    const session = useSession();
    const user = session?.data?.user;
    const router = useRouter()
    const pathname = usePathname();

    if (session?.status === 'loading') return null;
    if (user?.role !== ROLES.hod.name) {
        return router.push(`/${user?.role}`)
    }

    return (
        <div className="md:flex justify-start items-start">
            {/* sidebar + navbar */}
            <div className="absolute z-40 sm:z-20 top-0 left-0 w-full bg-white p-6 flex justify-between items-center sm:hidden border-b-1 border-border">
                <Logo />
                <div className="cursor-pointer" onClick={() => setSidebar(!sidebar)}>
                    {sidebar ? <RxCross2 className="text-2xl" /> : <LuMenu className="text-2xl" />}
                </div>
            </div>
            <div className={`sm:z-20 z-30 fixed flex flex-col gap-5 justify-start items-start left-0 pt-[5.3rem] sm:pt-6 w-full h-screen overflow-y-scroll scroll-none sm:h-full sm:w-auto bg-white p-6 border-r-1 border-border transition-all duration-150 ease-in-out ${sidebar ? 'left-0' : 'left-full'} sm:left-0`}>
                <Logo className='hidden sm:block' />
                <div className="left-full bg-white w-full sm:w-auto pt-3 flex flex-col justify-between h-full">
                    <Navigator setToggle={setSidebar} />
                    <div className="w-full space-y-3">
                        <NavigationItem
                            href="/hod/contact-us"
                            title="Contact us"
                            icon={<IoMdContact />}
                            activeIcon={<IoMdContact />}
                            active={pathname == '/hod/contact-us' ? true : false} />
                        <Button onClick={() => signOut()} variant="destructive" className="sm:w-[230px]">
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
            <div className="px-6 py-8 sm:ml-[17.4rem] pt-28 sm:mb-0 sm:py-8 w-full h-screen bg-secondary-background overflow-y-scroll">
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}