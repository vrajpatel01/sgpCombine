'use client'
import { useState } from "react";

import GroupInfoItem from "../components/groupInfoItem";
import { useGetPendingGroups } from "../../../services/query";
import { useAssignGroup } from "../../../services/mutation";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function assignGroupsModel({ facultyId, data, setData }) {
    const groups = useGetPendingGroups()
    const assignGroup = useAssignGroup()
    const [searchText, setSearchText] = useState('')
    const [selectedGroups, setSelectedGroups] = useState([])

    const handleAssignGroup = (e) => {
        e.preventDefault()
        assignGroup.mutate({
            facultyId: facultyId,
            groups: selectedGroups
        })
    }

    console.log(groups.data);

    return (
        <SheetContent className="space-y-5">
            <SheetHeader>
                <SheetTitle>Assign Faculty</SheetTitle>
                <SheetDescription>you can assign multiple groups at a time to the single faculty</SheetDescription>
            </SheetHeader>
            <Separator />
            <form onSubmit={handleAssignGroup} className="space-y-4" noValidate>
                <div className="flex justify-center items-center gap-3">
                    <Input value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        placeholder='Search Group...' />
                </div>
                <div className="flex justify-end">
                    <Button
                        isLoading={assignGroup.isPending}
                        disabled={(groups.isSuccess && groups?.data?.data.length === 0) || assignGroup.isPending}>
                        Add
                    </Button>
                </div>
                <div className="flex flex-col gap-3 mt-5">
                    {groups.isSuccess && groups?.data?.data.map((group) => (
                        <GroupInfoItem
                            checkBox
                            onClick={(e, select) => {
                                if (!select) {
                                    setSelectedGroups([...selectedGroups, group._id]);
                                } else {
                                    setSelectedGroups(selectedGroups.filter((item) => item !== group._id));
                                }
                            }}
                            group={group}
                            className='w-full border-border border-1 !shadow-none select-none' />
                    ))}
                    {groups.isSuccess && groups?.data?.data.length === 0 && (
                        <span className="mx-auto text-muted-foreground my-auto mt-5">No group available to assign.</span>
                    )}
                </div>
            </form>
        </SheetContent>
    )
}