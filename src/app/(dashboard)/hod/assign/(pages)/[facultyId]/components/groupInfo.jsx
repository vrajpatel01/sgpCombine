import GroupInfoItem from "./groupInfoItem"
import { useGetFacultyGroups } from "../../../services/query"
import Skeleton from "react-loading-skeleton"
export default function GroupInfo({ facultyId }) {
    const groups = useGetFacultyGroups(facultyId)

    return (
        <div className="w-full h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                {groups.isPending && Array(10).fill(0).map((_, i) => (
                    <Skeleton height={100} />
                ))}
                {groups.isSuccess && groups?.data?.data.map((group) => (
                    <GroupInfoItem group={group} deassignBtn={true} link={`/hod/groups/${group?._id}`} />
                ))}
            </div>
        </div>
    )
}