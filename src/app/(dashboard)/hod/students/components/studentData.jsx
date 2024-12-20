import { useState } from "react"
import Skeleton from "react-loading-skeleton"
// components
import Pagination from "@/components/shared/pagination"
import TableCell from "@/components/shared/table/tableCell"
import TableRow from "@/components/shared/table/tableRow"

// network
import { useGetStudents } from "../services/query"

// icons
import Error from "@/components/shared/error"
import StudentDeleteConfirmationModel from "../models/studentDeleteConfirmationModel"
import EditStudentModel from "../models/editStudentModel"
import { Sheet } from "@/components/ui/sheet"
import { Dialog } from "@/components/ui/dialog"

export default function StudentData({ selectedItem, setSelectedItem }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [studentDeleteModel, setStudentDeleteModel] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState({})
    const [editStudentModel, setEditStudentModel] = useState(false)
    const students = useGetStudents();

    if (students.isError) return <Error message="Having some problem to fetch data." />

    if (students.isSuccess && students?.data?.students.length === 0) return <Error message="Currently not exists any account." />

    return (
        <>
            <div className="table-container mb-6 overflow-x-auto no-scroll  bg-white rounded-md w-full my-5 border-border border-[.5px]">
                <table className="w-full table-auto">
                    <thead className="border-b-1 border-border">
                        <TableRow header>
                            {students.isSuccess && <TableCell content="" />}
                            <TableCell content="Name" />
                            <TableCell content="Enrollment" />
                            <TableCell content="Email" />
                            <TableCell content="Phone Number" />
                            <TableCell content="Batch" />
                            <TableCell content="Semester" />
                            <TableCell content="Division" />
                        </TableRow>
                    </thead>
                    <tbody className="divide-y">
                        {students.isPending && Array(15).fill(0).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                            </TableRow>
                        ))}
                        {students.isSuccess && students.isSuccess && students?.data?.students?.map((student) => (
                            <TableRow
                                onClick={() => {
                                    setSelectedStudent(student)
                                    setEditStudentModel(true)
                                }}
                                checkBox
                                onChange={(id, checked) => {
                                    if (checked) {
                                        setSelectedItem([...selectedItem, id])
                                    } else {
                                        setSelectedItem(selectedItem.filter(item => item !== id))
                                    }
                                }}
                                id={student._id}
                                key={student._id}>
                                <TableCell content={student.name} />
                                <TableCell content={student.rollNumber} />
                                <TableCell content={student.email} />
                                <TableCell content={student.phoneNumber} />
                                <TableCell content={student.batch} />
                                <TableCell content={student.semester} />
                                <TableCell content={student.division} />
                            </TableRow>
                        ))}
                    </tbody>
                </table>
            </div >
            {/* {students.isSuccess && <Pagination
                totalPages={students?.data?.totalPages}
                setCurrentPage={e => setCurrentPage(e.selected + 1)}
                currentPage={currentPage} />} */}
            <Pagination
                totalPages={1}
                setCurrentPage={e => setCurrentPage(e.selected + 1)}
                currentPage={1} />
            <Dialog open={studentDeleteModel} onOpenChange={setStudentDeleteModel}>
                <StudentDeleteConfirmationModel data={studentDeleteModel} setData={setStudentDeleteModel} id={selectedStudent._id} deleteMode='single' />
            </Dialog>
            <Sheet open={editStudentModel} onOpenChange={setEditStudentModel}>
                <EditStudentModel data={editStudentModel} setData={setEditStudentModel} currentUserData={selectedStudent} setStudentDeleteModel={setStudentDeleteModel} />
            </Sheet>
        </>
    )
}
