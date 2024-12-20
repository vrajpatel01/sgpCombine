'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

// components
import FacultyInfoCard from "./components/facultyInfoCard";
import GroupInfo from "./components/groupInfo";

// models
import AssignGroupsModel from "./models/assignGroupsModel";

// icons
import { IoIosArrowBack } from "react-icons/io";
import { Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function AssignFacultyToGroup({ params, searchParams }) {
    const [assignGroupModel, setAssignGroupModel] = useState(false)
    const router = useRouter();

    const facultyId = searchParams.fid;
    return (
        <div className="h-full">
            <div className="header flex justify-between items-center gap-3">
                <div className="flex justify-start items-center gap-3">
                    <IoIosArrowBack onClick={router.back} className="text-2xl cursor-pointer" />
                    {/* <h1 className="text-title-28 mb-2">{facultyCode}</h1> */}
                </div>
                <Button onClick={() => setAssignGroupModel(!assignGroupModel)}>
                    Assign Group
                </Button>
            </div>

            <div className="flex justify-start items-start gap-5 h-full mt-5">
                <GroupInfo facultyId={facultyId} />
                <FacultyInfoCard facultyId={facultyId} />
            </div>
            <Sheet open={assignGroupModel} onOpenChange={setAssignGroupModel}>
                <AssignGroupsModel
                    facultyId={facultyId}
                    data={assignGroupModel}
                    setData={setAssignGroupModel} />
            </Sheet>
        </div>
    )
}