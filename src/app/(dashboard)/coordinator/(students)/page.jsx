'use client';
import { useState } from "react";

// icons
import { PiStudent } from "react-icons/pi";
import { SiMicrosoftexcel } from "react-icons/si";

// components
import StudentData from "./components/studentData";
import StudentDeleteConfirmationModel from "./models/studentDeleteConfirmationModel";
import { MdDelete } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet } from "@/components/ui/sheet";
import { IoPeopleOutline } from "react-icons/io5";
import { Dialog } from "@/components/ui/dialog";
import Link from "next/link";
import { Search } from "lucide-react";
import AddStudentModel from "./models/addStudentModel";
import AddStudentByExcelModel from "./models/addStudentByExcelModel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import { Permissions } from "@/lib/permissions";
import MyStudentData from "./components/myStudentData";

export default function Students() {
    const [addStudentModel, setAddStudentModel] = useState(false)
    const [addStudentByExcelModel, setAddStudentByExcelModel] = useState(false)
    const [selectedItem, setSelectedItem] = useState([])
    const [deleteStudentModel, setDeleteStudentModel] = useState(false)
    const session = useSession();
    const user = session?.data?.user;

    if (session.status === 'loading') return null;
    return (
        <div className="h-full">
            <div className="header flex justify-between items-center">
                <h1 className="text-title-28">Students</h1>
                {Permissions.hasPermission(user.role, 'student:update') &&
                    <div className="relative">
                        {selectedItem.length > 0 ?
                            <Button variant="destructive" className="flex gap-3 items-center" onClick={() => setDeleteStudentModel(true)} >
                                <MdDelete className="text-xl" />
                                <span>Delete Account</span>
                            </Button> :
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
                                            setAddStudentModel(true)
                                        }} className="space-x-3"><PiStudent /><span>Create One</span></DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => {
                                            setAddStudentByExcelModel(true)
                                        }} className="space-x-3"><SiMicrosoftexcel /><span>Insert Excel</span></DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>}
                    </div>}
            </div>
            <Tabs defaultValue="my-students" className="mt-5">
                {Permissions.hasPermission(user.role, 'student:update') &&
                    <TabsList>
                        <TabsTrigger value="my-students">My Students</TabsTrigger>
                        <TabsTrigger value="all-students">All Students</TabsTrigger>
                    </TabsList>}
                <TabsContent value="my-students">
                    <MyStudentData selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                </TabsContent>
                <TabsContent value="all-students">
                    <StudentData selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                </TabsContent>
            </Tabs>
            <Sheet open={addStudentModel} onOpenChange={setAddStudentModel}>
                <AddStudentModel data={addStudentModel} setData={setAddStudentModel} />
            </Sheet>
            <Sheet open={addStudentByExcelModel} onOpenChange={setAddStudentByExcelModel}>
                <AddStudentByExcelModel data={addStudentByExcelModel} setData={setAddStudentByExcelModel} />
            </Sheet>
            <Dialog open={deleteStudentModel} onOpenChange={setDeleteStudentModel}>
                <StudentDeleteConfirmationModel
                    data={deleteStudentModel}
                    setData={setDeleteStudentModel}
                    deleteMode='multiple'
                    id={selectedItem}
                    setSelectedItem={setSelectedItem} />
            </Dialog>
        </div>
    )
}