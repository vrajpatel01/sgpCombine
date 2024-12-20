'use client';
import { ROLES } from "@/utils/role";
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation";

export const useValidRouter = () => {
    const session = useSession()
    const user = session?.data?.user;
    const router = useRouter();
    const pathname = usePathname();

    if (session.status === 'loading') return { session }

    if (pathname === '/') {
        switch (user?.role) {
            case 'hod':
                router.replace('/hod');
                break;
            case 'coordinator':
                router.replace('/coordinator');
                break;
            case 'faculty':
                router.replace('/faculty');
                break;
            case 'student':
                router.replace('/student');
                break;
        }
    }

    return { session }
}