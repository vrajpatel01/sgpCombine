import { useGetGroupMembers } from "@/app/(dashboard)/student/(group-profile)/services/query";
import { useSession } from "next-auth/react";

export function useLeader() {
    const session = useSession()
    const email = session?.data?.user?.email;
    const groupMembersInfo = useGetGroupMembers()

    if (groupMembersInfo.isError) {
        return [groupMembersInfo, null];
    }

    const leader = groupMembersInfo?.data?.students[0];
    const isLeader = leader?.email === email;
    return [groupMembersInfo, isLeader];
}