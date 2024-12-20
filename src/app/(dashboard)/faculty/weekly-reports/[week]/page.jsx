'use client';
import GroupInfoItem from "../../groups/components/groupInfoItem";
import { IoFilter } from "react-icons/io5";
import { useState } from "react";
import { useGetAllGroups } from "../../groups/services/query";
import Skeleton from "react-loading-skeleton";
import { usePathname } from "next/navigation";

export default function Submission() {
    const pathname = usePathname();
    const [filter, setFilter] = useState(0)
    const currentWeek = pathname.split('/')[3]

    const handlerFilter = (e) => {
        if (e === filter) setFilter(0)
        else setFilter(e)
    }
    const groups = useGetAllGroups(currentWeek);
    const filteredGroups = groups.data?.data?.filter(group => {
        if (filter === 0) return true
        if (filter === 1 && group.status === 'approved') return true
        if (filter === 2 && group.status === 'pending') return true
        if (filter === 3 && group.status === 'rejected') return true
        return false
    })

    return (
        <div>
            <div className="flex justify-start items-center gap-4 mb-5">
                <div><IoFilter /></div>
                <div onClick={() => handlerFilter(1)} className={`${filter === 1 ? 'bg-primary text-white' : null} px-6 py-2 rounded-full cursor-pointer select-none`}>Approved</div>
                <div onClick={() => handlerFilter(2)} className={`${filter === 2 ? 'bg-primary text-white' : null} px-6 py-2 rounded-full cursor-pointer select-none`}>Pending</div>
                <div onClick={() => handlerFilter(3)} className={`${filter === 3 ? 'bg-primary text-white' : null} px-6 py-2 rounded-full cursor-pointer select-none`}>Rejected</div>
            </div>
            {groups.isPending &&
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {Array.from({ length: 5 }).map((group, index) => (
                        <Skeleton key={index} width={Infinity} height={130} />
                    ))}
                </div>}
            {groups.isSuccess &&
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {filteredGroups.map((group, index) => (
                        <GroupInfoItem key={index} group={group} link={`/faculty/weekly-reports/groupId`} />
                    ))}
                </div>}
        </div>
    )
}