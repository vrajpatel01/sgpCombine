import { useEffect, useState } from "react"

// components
import GroupInfoItem from "./groupInfoItem"
import { useGetFacultyGroups } from "../../../services/query"
import Skeleton from "react-loading-skeleton"
import { Input } from "@/components/ui/input"
import { useDeassignGroup } from "../../../services/mutation"

export default function GroupInfo({ facultyId }) {
    const groups = useGetFacultyGroups(facultyId)
    if (groups.isSuccess && !groups.data.success) {
        return null
    }
    return (
        <div className="w-full h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                {groups.isPending && Array(10).fill(0).map((_, i) => (
                    <Skeleton height={100} />
                ))}
                {groups.isSuccess && groups?.data?.data.map((group) => (
                    <GroupInfoItem group={group} deassignBtn={true} link={`/groups/${group?._id}`} />
                ))}
            </div>
        </div>
    )
}