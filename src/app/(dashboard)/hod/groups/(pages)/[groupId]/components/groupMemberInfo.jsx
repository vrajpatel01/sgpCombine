import { useState } from "react";

// models
import StudentInformationModel from "../models/studentInfoModel";

// components
import GroupMemberInfoItem from "./groupMemberInfoItem";
import { Sheet } from "@/components/ui/sheet";

export default function GroupMemberInfo({ group }) {
    const [memberInfoModel, setMemberInfoModel] = useState(false)
    const [studentId, setStudentId] = useState('')
    return (
        <div className="w-full sm:min-w-min">
            <div className="text-body-18 font-medium p-3 px-5 bg-white mb-4 rounded-md text-primary-text shadow-sm flex justify-between items-center">
                <span>Group Members</span>
                <div className="px-3 rounded-full bg-primary text-secondary-text text-body-16">{group?.students?.length}</div>
            </div>
            <div className="text-light-text flex justify-start items-start flex-col gap-3 w-full">
                {group?.students.map((student, index) => (
                    <GroupMemberInfoItem
                        key={student.id}
                        details={student}
                        admin={index === 0 ? true : undefined}
                        onClick={() => {
                            setStudentId(student._id)
                            setMemberInfoModel(true)
                        }}
                        className='cursor-pointer' />
                ))}
            </div>
            {studentId &&
                <Sheet open={memberInfoModel} onOpenChange={setMemberInfoModel}>
                    <StudentInformationModel studentId={studentId} data={memberInfoModel} setData={setMemberInfoModel} />
                </Sheet>}
        </div>
    )
}