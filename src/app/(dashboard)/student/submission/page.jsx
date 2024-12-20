'use client'
import { useRouter } from "next/navigation";
import { useGetWeekInformation } from "./services/query";

export default function SubmissionPage() {
    const router = useRouter();
    const weekInfo = useGetWeekInformation()
    if (weekInfo.isPending) {
        return 'Loading...';
    }
    const data = weekInfo.data.data;

    ; (
        async () => {
            await router.replace(`/student/submission/week-${data.currentWeek}`);
        }
    )()
    return null;
}