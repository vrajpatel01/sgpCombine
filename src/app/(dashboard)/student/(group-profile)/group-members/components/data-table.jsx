"use client"

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CircleMinus, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRemoveGroupMember } from "../../services/mutation"
import { useContext, useState } from "react"
import { GroupInfoContext } from "../../context/useGroupInfoContext"

export function DataTable({
    columns,
    data,
    checkbox = true
}) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    const [removeMemberModel, setRemoveMemberModel] = useState(false)
    const { dates, projectDetails } = useContext(GroupInfoContext)
    const removeMember = useRemoveGroupMember({
        onSuccess: () => {
            setRemoveMemberModel(false)
        }
    });

    return (
        <div className="rounded-md border w-full !overflow-x-auto">
            <Table>
                <TableHeader>
                    {table?.getHeaderGroups()?.map((headerGroup) => (
                        <TableRow key={headerGroup?.id}>
                            <TableHead className="whitespace-nowrap" key={0}>
                            </TableHead>
                            {headerGroup?.headers?.map((header) => {
                                return (
                                    <TableHead className="whitespace-nowrap" key={header?.id}>
                                        {header?.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header?.column?.columnDef?.header,
                                                header?.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table?.getRowModel().rows?.length ? (
                        table?.getRowModel()?.rows?.map((row, index) => (
                            <TableRow
                                className="whitespace-nowrap"
                                key={row?.id}
                                data-state={row?.getIsSelected() && "selected"}>
                                <TableCell key={0}>
                                    {dates.start && dates.end && !projectDetails?.data?.data?.isLocked && projectDetails?.data?.data?.isLeader && index !== 0 && checkbox &&
                                        <Dialog model={removeMemberModel} onOpenChange={setRemoveMemberModel}>
                                            <DialogTrigger>
                                                <div className="p-2 rounded-full cursor-pointer hover:bg-muted-foreground/15">
                                                    <span><CircleMinus size={18} className="text-muted-foreground" /></span>
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Remove member</DialogTitle>
                                                    <DialogDescription>Are you sure you want to remove this member from your group?</DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter className="w-full flex justify-end items-center">
                                                    <Button onClick={() => removeMember.mutate(row.getValue('email'))} disabled={removeMember.isPending} variant="destructive" className="space-x-2">
                                                        {removeMember.isPending && <Loader2 size={16} className="animate-spin" />}
                                                        <span>Remove</span>
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>}
                                </TableCell>
                                {row?.getVisibleCells()?.map((cell) => (
                                    <TableCell key={cell?.id}>
                                        {flexRender(cell?.column?.columnDef?.cell, cell?.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns?.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
