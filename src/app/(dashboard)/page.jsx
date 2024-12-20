'use client';
import { Loader2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function Page() {
    const session = useSession()
    const user = session?.data?.user;
    const router = useRouter();
    const pathname = usePathname();

    if (session.status === 'loading') return <Loader />;

    if (pathname == '/') {
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

    if (user?.role === undefined && session.status === 'authenticated') {
        signOut();
    }

    return (
        <Loader />
    );
}

const Loader = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Loader2 size={50} className="animate-spin" />
        </div>
    )
}