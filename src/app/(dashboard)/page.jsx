'use client';
import { useValidRouter } from "@/hooks/useValidRoute";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
    const { session } = useValidRouter();
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Loader2 size={50} className="animate-spin" />
        </div>
    );
}