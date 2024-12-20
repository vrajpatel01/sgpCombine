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

    // if (user?.role === ROLES.hod.name && pathname !== '/hod') {
    //     router.replace('/hod');
    // }
    // if (user?.role === ROLES.coordinator.name && pathname !== '/coordinator') {
    //     router.replace('/coordinator');
    // }
    // if (user?.role === ROLES.faculty.name && pathname !== '/faculty') {
    //     router.replace('/faculty');
    // }
    // if (user?.role === ROLES.student.name && pathname !== '/student') {
    //     router.replace('/student');
    // }

    return { session }
}