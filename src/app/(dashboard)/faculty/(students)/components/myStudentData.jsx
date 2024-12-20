'use client';
import TableCell from "@/components/shared/table/tableCell"
import TableRow from "@/components/shared/table/tableRow"

// network
import { useGetMyStudents, useGetStudents } from "../services/query"
import Skeleton from "react-loading-skeleton"
import Error from "@/components/shared/error";

export default function MyStudentData() {
    const students = useGetMyStudents();

    if (students?.error?.response?.status === 404) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="text-xl text-muted-foreground">No students found.</span>
            </div>
        )
    }
    if (students.isError) return <Error message="Having some problem to fetch data." />
    return (
        <>
            <div className="table-container mb-6 overflow-x-auto no-scroll  bg-white rounded-md w-full my-5 border-border border-[.5px]">
                <table className="w-full table-auto">
                    <thead className="border-b-1 border-border">
                        <TableRow header>
                            {/* {students.isSuccess && <TableCell content="" />} */}
                            <TableCell content="Name" />
                            <TableCell content="Email" />
                            <TableCell content="Project Title" />
                            <TableCell content="Group Id" />
                        </TableRow>
                    </thead>
                    <tbody className="divide-y">
                        {students.isLoading && Array(15).fill(0).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                            </TableRow>
                        ))}
                        {students.isSuccess && students?.data?.data?.map((student) => (
                            <TableRow
                                id={student._id}
                                key={student._id}>
                                <TableCell content={student.name} />
                                <TableCell content={student.email} />
                                <TableCell content={student.projectTitle} />
                                <TableCell content={student.groupId} />
                            </TableRow>
                        ))}
                    </tbody>
                </table>
            </div >
        </>
    )
}
