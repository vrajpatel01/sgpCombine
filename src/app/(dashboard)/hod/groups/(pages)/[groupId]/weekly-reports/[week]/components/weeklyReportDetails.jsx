'use client';
import { usePathname, Link } from "next/navigation";
import { useGetGroupSubmissionData } from "../../services/query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkDataViewer from "./workDataViewer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BiError } from "react-icons/bi";
import { IoChevronBackSharp } from "react-icons/io5";

export default function WeeklyReportDetails() {
    const pathname = usePathname();

    const currentWeek = pathname.split('/')[5];
    const week = parseInt(currentWeek);
    const groupId = pathname.split('/')[3]
    const groupData = useGetGroupSubmissionData({ groupId, week });
    if (groupData.isPending) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <div className="border-black border-l-2 rounded-full w-14 h-14 animate-spin">
                </div>
            </div>
        )
    }

    if (!groupData.data) {
        return (
            <div className="w-full h-full flex justify-center items-center flex-col">
                <div className="bg-white shadow-sm rounded-md p-4 flex justify-center items-center text-center sm:text-left flex-col sm:flex-row gap-3 mt-10">
                    <BiError className="text-3xl sm:text-2xl" />
                    Group has not submitted the report for week {week.toString()}
                </div>
            </div>
        )
    }


    return (
        <div className="w-full space-y-5">
            <div className="header flex justify-between items-center flex-col sm:flex-row w-full gap-4">
                <div className="flex justify-between sm:justify-between items-center gap-3 w-full">
                    <div className="flex justify-between items-center gap-3">
                        <h1 className="text-title-28 whitespace-nowrap flex flex-nowrap">Week {currentWeek} <span className="hidden sm:block"> - {new Date(groupData.data?.data?.updatedAt).toDateString()}</span></h1>
                        <span className="capitalize border-border border-1 select-none px-3 py-2 rounded-md">{groupData.data?.data?.status}</span>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Faculty info</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Faculty info</DialogTitle>
                            </DialogHeader>
                            <table>
                                <tr>
                                    <td>name</td>
                                    <td>{groupData?.data?.data?.faculty?.name}</td>
                                </tr>
                                <tr>
                                    <td>email</td>
                                    <td><a href={`mailto:${groupData?.data?.data?.faculty?.email}`}>{groupData?.data?.data?.faculty?.email}</a></td>
                                </tr>
                                <tr>
                                    <td>Designation</td>
                                    <td>{groupData?.data?.data?.faculty?.designation}</td>
                                </tr>
                                <tr>
                                    <td>Employee number</td>
                                    <td>{groupData?.data?.data?.faculty?.employeeCode}</td>
                                </tr>
                            </table>
                        </DialogContent>
                    </Dialog>
                    {/* <span className="capitalize border-border border-1 select-none px-3 py-2 rounded-md">{groupData.data?.data?.faculty?.name}</span> */}
                </div>
            </div>
            <Tabs defaultValue="overall">
                <TabsList>
                    <TabsTrigger value="overall">Overall work</TabsTrigger>
                    <TabsTrigger value="members">Members work</TabsTrigger>
                    <TabsTrigger disabled={groupData?.data?.data?.rejectMessages.length === 0} value="rejection">Rejection</TabsTrigger>
                </TabsList>
                <TabsContent value="overall">
                    <form className="mt-5 w-full flex flex-col gap-4">
                        <WorkDataViewer
                            name="Expected Outcome as per Timeline"
                            workDone={groupData.data?.data?.expectedOutcome} />
                        <WorkDataViewer
                            name="Work Done"
                            workDone={groupData.data?.data?.workDone} />
                    </form>
                </TabsContent>
                <TabsContent value="members">
                    <form className="mt-5 w-full space-y-5">
                        {groupData.data?.data?.studentsWork.map((studentWork, index) => {
                            return <WorkDataViewer
                                name={studentWork.name}
                                email={studentWork.email}
                                workDone={studentWork.work} />
                        })}
                    </form>
                </TabsContent>
                <TabsContent value="rejection" className="space-y-5">
                    {groupData.data?.data?.rejectMessages.map((message, index) => {
                        return <div key={index} className="bg-white p-4 rounded-md border-[.5px] border-border flex flex-col gap-4">
                            <div>{message.msg}</div>
                            <div className="text-gray-500 text-sm">{new Date(message.date).toDateString()}</div>
                        </div>
                    })}
                </TabsContent>
            </Tabs>
        </div>
    )
}