import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDeassignCoordinator } from "../services/mutation";
import { Loader2 } from "lucide-react";

export default function DeassignCoordinatorModel({ currentUserData, setDeassignCoordinatorModel }) {

    const deassignCoordinator = useDeassignCoordinator()


    const handleSubmit = () => {
        deassignCoordinator.mutate({ id: currentUserData._id }, {
            onSuccess: () => {
                setDeassignCoordinatorModel(false)
            }
        })
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Deassign Coordinator</DialogTitle>
                <DialogDescription>Are you sure you want to deassign this faculty as an coordinator.</DialogDescription>
            </DialogHeader>

            <div className="w-full flex justify-end">
                <Button onClick={handleSubmit} disabled={deassignCoordinator.isPending} variant="danger">
                    {deassignCoordinator.isPending && <Loader2 size={18} className="animate-spin" />}
                    <span>Deassign</span>
                </Button>
            </div>
        </DialogContent>
    )
}