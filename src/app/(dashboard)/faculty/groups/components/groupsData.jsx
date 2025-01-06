// components
import Skeleton from "react-loading-skeleton"
import { useGetAllGroups, useGetAllGroupsCoordinator } from "../services/query"
import GroupInfoItem from "./groupInfoItem"
import Error from "@/components/shared/error"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Permissions } from "@/lib/permissions"
import { useSession } from "next-auth/react"

export default function GroupsData() {
    const groups = useGetAllGroups()
    const allGroups = useGetAllGroupsCoordinator();
    const session = useSession();
    const user = session?.data?.user;
    if (session.status == 'loading') return null

    Permissions.hasPermission(user.role, 'groups:view-all') && allGroups.refetch()
    // if (groups?.data?.data?.length === 0) {
    //     return (
    // <div className="flex justify-center items-center h-screen">
    //     <div className="text-xl text-muted-foreground">No groups found.</div>
    // </div>
    //     )
    // }
    if (groups.isError) return <Error message="Having some problem to fetch data." />
    return (
        <Tabs defaultValue="my-groups">
            {Permissions.hasPermission(user.role, 'groups:view-all') &&
                <TabsList>
                    <TabsTrigger value="my-groups" default>My Groups</TabsTrigger>
                    <TabsTrigger value="all-groups">All Groups</TabsTrigger>
                </TabsList>}
            <TabsContent value="my-groups">
                {groups?.data?.data?.length === 0 ?
                    <div className="flex justify-center items-center h-screen w-full">
                        <div className="text-xl text-muted-foreground">No groups found.</div>
                    </div> : groups.isPending && Array(20).fill(0).map((_, i) => (
                        <Skeleton height={150} />
                    ))}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {groups.isSuccess && groups?.data?.data.map((group) => (
                        <GroupInfoItem key={index} group={group} link={`/groups/${group._id}`} />
                    ))}
                </div>
            </TabsContent>
            {Permissions.hasPermission(user.role, 'groups:view-all') &&
                <TabsContent value="all-groups">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {allGroups.isSuccess && allGroups?.data?.data.map((group, index) => (
                            <GroupInfoItem key={index} group={group} link={`/groups/${group._id}`} />
                        ))}
                    </div>
                </TabsContent>}
        </Tabs>
    )
}