'use client';
import { useState } from "react";

// icons
import { IoPeopleOutline } from "react-icons/io5";
import { SiMicrosoftexcel } from "react-icons/si";
import { MdDelete } from "react-icons/md";

// models

// components
import FacultyData from "./components/facultyData";
import FacultyDeleteConfirmationModel from "./models/facultyDeleteConfirmationModel";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet } from "@/components/ui/sheet";
import { Dialog } from "@/components/ui/dialog";
import { Permissions } from "@/lib/permissions";
import { useSession } from "next-auth/react";
import AddFacultyModel from "./models/addFacultyModel";
import AddFacultyByExcelModel from "./models/addFacultyByExcelModel"

export default function Faculty() {
    const [addFacultyModel, setAddFacultyModel] = useState(false)
    const [addFacultyByExcelModel, setAddFacultyByExcelModel] = useState(false)
    const [selectedItem, setSelectedItem] = useState([])
    const [deleteFacultyModel, setDeleteFacultyModel] = useState(false)
    const session = useSession();
    const user = session?.data?.user;

    if (session.status === 'loading') return null
    return (
        <div className="h-full">
            <div className="header flex justify-between items-center">
                <h1 className="text-title-28">Faculty</h1>
                <div className="relative">
                    {selectedItem.length > 0 ?
                        Permissions.hasPermission(user?.role, 'faculty:create') &&
                        <Button variant="destructive" className="flex gap-3 items-center" onClick={() => setDeleteFacultyModel(true)} >
                            <MdDelete className="text-xl" />
                            <span>Delete Account</span>
                        </Button> :
                        Permissions.hasPermission(user?.role, 'faculty:delete') &&
                        <div className="flex justify-center items-center gap-5">
                            {/* <Link href='/search?role=student' className="bg-gray-200 p-3 rounded-md cursor-pointer">
                                <Search size={17} />
                            </Link> */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="flex gap-3 items-center" >
                                        <IoPeopleOutline className="text-xl" />
                                        <span>Add Account</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="mr-4">
                                    <DropdownMenuLabel>Choose a method to add Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => {
                                        setAddFacultyModel(true)
                                    }} className="space-x-3"><IoPeopleOutline /><span>Create One</span></DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => {
                                        setAddFacultyByExcelModel(true)
                                    }} className="space-x-3"><SiMicrosoftexcel /><span>Insert Excel</span></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    }
                </div>
            </div>
            <FacultyData selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            <Sheet open={addFacultyModel} onOpenChange={setAddFacultyModel}>
                <AddFacultyModel data={addFacultyModel} setData={setAddFacultyModel} />
            </Sheet>
            <Sheet open={addFacultyByExcelModel} onOpenChange={setAddFacultyByExcelModel}>
                <AddFacultyByExcelModel data={addFacultyByExcelModel} setData={setAddFacultyByExcelModel} />
            </Sheet>
            <Dialog open={deleteFacultyModel} onOpenChange={setDeleteFacultyModel}>
                <FacultyDeleteConfirmationModel data={deleteFacultyModel} setData={setDeleteFacultyModel} deleteMode='multiple' id={selectedItem} setSelectedItem={setSelectedItem} />
            </Dialog>
        </div>
    )
}