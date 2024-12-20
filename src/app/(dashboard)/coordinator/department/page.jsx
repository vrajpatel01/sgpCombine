'use client'
import { useState } from "react";
import DepartmentInfo from "./components/departmentInfo";
import GroupSelectionDate from "./components/groupSelectionDate";
import SemesterDate from "./components/semesterDate";
import SetConfirmationModel from "./models/setConfirmationModel";
import MemberLimit from "./components/memberLimit";

export default function DepartmentScreen() {
    const [semesterDateMode, setSemesterDateModel] = useState(false)
    const [groupSelectionDateModel, setGroupSelectionDateModel] = useState(false)
    const [groupLimit, setGroupLimit] = useState(0);
    const [semesterDate, setSemesterDate] = useState({
        start: new Date(),
        end: new Date(),
    })
    const [groupDate, setGroupDate] = useState({
        start: new Date(),
        end: new Date(),
    })
    const [calenderState, setCalenderState] = useState({
        semesterDate: {
            start: false,
            end: false
        },
        groupSelectionDate: {
            start: false,
            end: false
        }
    })
    return (
        <>
            <div className="h-full max-w-[900px] mx-auto space-y-10">
                <div className="header flex justify-between items-center">
                    <h1 className="text-title-28">Department</h1>
                </div>
                {/* <div className="mt-5 flex justify-start items-start flex-col lg:flex-row gap-5 w-full">
                    <div className="grid lg:grid-cols-2 gap-5 w-full"> */}
                <div className="space-y-5">
                    <DepartmentInfo />
                    <MemberLimit setGroupLimit={setGroupLimit} groupLimit={groupLimit} />
                    <SemesterDate
                        setSemesterDate={setSemesterDate}
                        semesterDate={semesterDate}
                        setSemesterDateModel={setSemesterDateModel}
                        state={calenderState}
                        setState={setCalenderState} />
                    <GroupSelectionDate
                        setGroupSelectionDate={setGroupDate}
                        groupSelectionDate={groupDate}
                        setGroupSelectionDateModel={setGroupSelectionDateModel}
                        state={calenderState}
                        setState={setCalenderState} />
                </div>
                <SetConfirmationModel
                    selectedDates={semesterDate}
                    data={semesterDateMode}
                    setData={setSemesterDateModel}
                    type='semester' />
                <SetConfirmationModel
                    selectedDates={groupDate}
                    data={groupSelectionDateModel}
                    setData={setGroupSelectionDateModel}
                    type='group' />
            </div>
        </>
    )
}