'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { MemberAddForm } from "./components/memberAddForm"
import { GroupMembersSkeleton } from "@/components/group-profile/skeleton/groupMember"
import { useContext } from "react"
import { GroupInfoContext } from "../context/useGroupInfoContext"
import { CircleX } from "lucide-react"
import { ErrorComp } from "@/components/error"

export default function GroupMembersPage() {
    const { isLoading, dates, groupMembersInfo, projectDetails } = useContext(GroupInfoContext)
    const error = groupMembersInfo?.error?.response

    if (isLoading.dates || isLoading.groupMembersInfo) {
        return (
            <CardContent>
                <GroupMembersSkeleton />
            </CardContent>
        )
    }

    if (error?.status == 400 || error?.status == 401) {
        return (
            <CardContent className="py-20 border-t">
                <ErrorComp icon={<CircleX size={42} />} text="You are not in any group" />
            </CardContent>
        )
    }

    if (error?.status == 404 || error?.status == 500) {
        return (
            <CardContent className="py-20 border-t">
                <ErrorComp icon={<CircleX size={42} />} text="Having some issue please try again later" />
            </CardContent>
        )
    }

    // console.log('start', dates.start)
    // console.log('end', dates.end)
    // console.log('isLocked', projectDetails.data.data.isLocked)
    // console.log('isLeader', projectDetails.data.data.isLeader)
    // console.log('total', dates.start && dates.end && !projectDetails?.data?.data?.isLocked && projectDetails?.data?.data?.isLeader)

    return (
        <div className="overflow-hidden">
            <Dialog>
                <CardContent>
                    <DataTable columns={columns} data={groupMembersInfo?.data?.students} />
                </CardContent>
                {dates.start && dates.end && !projectDetails?.data?.data?.isLocked && projectDetails?.data?.data?.isLeader && <CardFooter className="border-t px-6 py-4 space-x-5">
                    <DialogTrigger className="h-10 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                        Add member
                    </DialogTrigger>
                </CardFooter>}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add member</DialogTitle>
                        <DialogDescription>Type the Email ID of the person you want to add to the group.</DialogDescription>
                    </DialogHeader>
                    <MemberAddForm />
                </DialogContent>
            </Dialog>
        </div>
    )
}