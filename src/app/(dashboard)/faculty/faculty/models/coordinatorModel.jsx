'use client';
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAssignCoordinator } from "../services/mutation";
import { Loader2 } from "lucide-react";

export function CoordinatorModel({ currentUserData, setCoordinatorModel }) {
    const assignCoordinator = useAssignCoordinator();
    const [selectedSemester, setSelectedSemester] = useState([])
    const addSemester = (semester) => {
        if (selectedSemester.includes(semester)) {
            setSelectedSemester(selectedSemester.filter(item => item !== semester))
        } else {
            setSelectedSemester([...selectedSemester, semester])
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        assignCoordinator.mutate({
            id: currentUserData._id,
            semester: selectedSemester
        }, {
            onSuccess: (data) => {
                if (data.success) {
                    return setCoordinatorModel(false)
                }
            }
        });
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Make Coordinator</DialogTitle>
                <DialogDescription>Choose a semester to assign a project coordinator.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-8 gap-2">
                <Button className={cn({
                    '!bg-black/30 text-black': selectedSemester.includes(1),
                })} onClick={() => addSemester(1)} variant='secondary'>1</Button>
                <Button className={cn({
                    '!bg-black/30 text-black': selectedSemester.includes(2),
                })} onClick={() => addSemester(2)} variant='secondary'>2</Button>
                <Button className={cn({
                    '!bg-black/30 text-black': selectedSemester.includes(3),
                })} onClick={() => addSemester(3)} variant='secondary'>3</Button>
                <Button className={cn({
                    '!bg-black/30 text-black': selectedSemester.includes(4),
                })} onClick={() => addSemester(4)} variant='secondary'>4</Button>
                <Button className={cn({
                    '!bg-black/30 text-black': selectedSemester.includes(5),
                })} onClick={() => addSemester(5)} variant='secondary'>5</Button>
                <Button className={cn({
                    '!bg-black/30 text-black': selectedSemester.includes(6),
                })} onClick={() => addSemester(6)} variant='secondary'>6</Button>
                <Button className={cn({
                    '!bg-black/30 text-black': selectedSemester.includes(7),
                })} onClick={() => addSemester(7)} variant='secondary'>7</Button>
                <Button className={cn({
                    '!bg-black/30 text-black': selectedSemester.includes(8),
                })} onClick={() => addSemester(8)} variant='secondary'>8</Button>
            </div>

            <div className="flex justify-end">
                <Button onClick={handleOnSubmit} className="max-w-min">
                    {assignCoordinator.isPending && <Loader2 size={18} className="animate-spin text-base" />}
                    <span>Assign</span>
                </Button>
            </div>
        </DialogContent>
    )
}