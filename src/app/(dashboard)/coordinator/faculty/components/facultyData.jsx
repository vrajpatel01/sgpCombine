import { useState } from "react"
import Skeleton from "react-loading-skeleton"

// components
import TableCell from "@/components/shared/table/tableCell"
import TableRow from "@/components/shared/table/tableRow"
import Pagination from "@/components/shared/pagination"
import Error from "@/components/shared/error"

// models
import FacultyDeleteConfirmationModel from "../models/facultyDeleteConfirmationModel"
import EditFacultyModel from "../models/editFacultyModel"

// network
import { useGetFaulty } from "../services/query"
import { Sheet } from "@/components/ui/sheet"
import { Dialog } from "@/components/ui/dialog"
import { CoordinatorModel } from "../models/coordinatorModel"
import { Permissions } from "@/lib/permissions"
import { useSession } from "next-auth/react"

export default function FacultyData({ selectedItem, setSelectedItem }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [facultyDeleteModel, setFacultyDeleteModel] = useState(false)
    const [selectedFaculty, setSelectedFaculty] = useState({})
    const [editFacultyModel, setEditFacultyModel] = useState(false)
    const [coordinatorModel, setCoordinatorModel] = useState(false)
    // const faculties = useGetFaultyWithPagination(currentPage, 15)
    const session = useSession();
    const user = session?.data?.user;
    const faculties = useGetFaulty()

    if (faculties.isError) return <Error message="Having some problem to fetch data." />

    if (faculties.isSuccess && faculties?.data?.faculties.length === 0) return <Error message="Currently not exists any account." />

    if (session.status === 'loading') return <Skeleton count={15} height={30} />

    return (
        <>
            <div className="table-container mb-6 overflow-x-auto no-scroll  bg-white rounded-md w-full my-5 border-border border-[.5px]">
                <table className="w-full">
                    <thead className="border-b-1 border-border">
                        <TableRow header>
                            {faculties.isSuccess && <TableCell content="" />}
                            <TableCell content="Name" />
                            <TableCell content="Employee Number" />
                            <TableCell content="Email" />
                            <TableCell content="Phone Number" />
                            <TableCell content="Designation" />
                            {/* <TableCell content="Subject Name" /> */}
                            {/* <TableCell content="Subject Code" /> */}
                        </TableRow>
                    </thead>
                    <tbody className="divide-y">
                        {faculties.isLoading && Array(15).fill(0).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                {/* <TableCell content={<Skeleton height={30} width={300} />} /> */}
                                {/* <TableCell content={<Skeleton height={30} width={300} />} /> */}
                            </TableRow>
                        ))}
                        {faculties.isSuccess && faculties.isSuccess && faculties?.data?.faculties?.map((faculty) => (
                            <TableRow
                                onClick={() => {
                                    if (Permissions.hasPermission(user?.role, 'faculty:update')) {
                                        setEditFacultyModel(true)
                                        setSelectedFaculty(faculty)
                                    }
                                }}
                                checkBox
                                onChange={(id, checked) => {
                                    if (checked) {
                                        setSelectedItem([...selectedItem, id])
                                    } else {
                                        setSelectedItem(selectedItem.filter(item => item !== id))
                                    }
                                }}
                                id={faculty._id}
                                key={faculty._id}>
                                <TableCell content={faculty.name} />
                                <TableCell content={faculty.employeeCode} />
                                <TableCell content={faculty.email} />
                                <TableCell content={faculty.mobileNumber} />
                                <TableCell content={faculty.designation} />
                                {/* <TableCell content={faculty.subjectName} /> */}
                                {/* <TableCell content={faculty.subjectCode} /> */}
                            </TableRow>
                        ))}
                    </tbody>
                </table>
            </div >
            {/* {faculties.isSuccess && <Pagination
                totalPages={faculties?.data?.totalPages}
                setCurrentPage={e => setCurrentPage(e.selected + 1)}
                currentPage={currentPage} />} */}
            <Pagination
                totalPages={1}
                setCurrentPage={e => setCurrentPage(e.selected + 1)}
                currentPage={1} />
            <Dialog open={facultyDeleteModel} onOpenChange={setFacultyDeleteModel}>
                <FacultyDeleteConfirmationModel data={facultyDeleteModel} setData={setFacultyDeleteModel} id={selectedFaculty._id} deleteMode="single" />
            </Dialog>
            <Sheet open={editFacultyModel} onOpenChange={setEditFacultyModel}>
                <EditFacultyModel
                    setCoordinatorModel={setCoordinatorModel}
                    setData={setEditFacultyModel}
                    currentUserData={selectedFaculty}
                    setFacultyDeleteModel={setFacultyDeleteModel} />
            </Sheet>
            <Dialog open={coordinatorModel} onOpenChange={setCoordinatorModel}>
                <CoordinatorModel currentUserData={selectedFaculty} setCoordinatorModel={setCoordinatorModel} />
            </Dialog>
        </>
    )
}