// components
import PopUpModel from "@/components/models/popUpModel";

// network
import { useDeleteFacultyAccount, useDeleteMultipleFacultyAccount } from "../services/mutation";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function FacultyDeleteConfirmationModel({ data, setData, id, deleteMode, setSelectedItem }) {

    const deleteAccount = useDeleteFacultyAccount()
    const deleteMultipleAccounts = useDeleteMultipleFacultyAccount()

    const handleFormSubmit = e => {
        e.preventDefault()

        if (deleteMode === 'single') {
            deleteAccount.mutate(id, {
                onSuccess: () => {
                    setData(false)
                }
            })
        } else if (deleteMode === 'multiple') {
            deleteMultipleAccounts.mutate(id, {
                onSuccess: () => {
                    setSelectedItem([])
                    setData(false)
                }
            })
        }
    }
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>Are you sure you want to delete this Hod Account. Please note that this action cannot be undone.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4" noValidate>
                <div className="flex justify-end items-center gap-3">
                    <Button
                        type="submit"
                        variant="destructive"
                        isLoading={deleteAccount.isPending || deleteMultipleAccounts.isPending}
                        disabled={deleteAccount.isPending || deleteMultipleAccounts.isPending}>
                        <span>Delete</span>
                    </Button>
                </div>
            </form>
        </DialogContent>
    )
}