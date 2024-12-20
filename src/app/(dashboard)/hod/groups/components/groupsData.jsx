// components
import Skeleton from "react-loading-skeleton";
import GroupInfoItem from "../../assign/(pages)/[facultyId]/components/groupInfoItem";
import { useGetAllGroups } from "../../assign/services/query";

export default function GroupsData() {
    const group = useGetAllGroups();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {group.isPending && Array(20).fill(0).map((_, i) => (
                <Skeleton height={150} />
            ))}
            {group.isSuccess && group?.data?.data.map((group) => (
                <GroupInfoItem group={group} link={`/hod/groups/${group._id}`} />
            ))}
        </div>
    )
}