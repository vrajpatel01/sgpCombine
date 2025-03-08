import { useState } from "react";
import Skeleton from "react-loading-skeleton";
// components
import Pagination from "@/components/shared/pagination";
import TableCell from "@/components/shared/table/tableCell";
import TableRow from "@/components/shared/table/tableRow";

// network
import {
  useGetStudentWithPagination,
  useGetStudents,
  useGetStudentsWithoutGroup,
} from "../services/query";

// icons
import Error from "@/components/shared/error";
import StudentDeleteConfirmationModel from "../models/studentDeleteConfirmationModel";
import EditStudentModel from "../models/editStudentModel";
import { Sheet } from "@/components/ui/sheet";
import { Dialog } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { Permissions } from "@/lib/permissions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

export default function StudentData({ selectedItem, setSelectedItem }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [studentDeleteModel, setStudentDeleteModel] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [editStudentModel, setEditStudentModel] = useState(false);
  // const students = useGetStudentWithPagination(currentPage, 15)
  const studentsWithoutGroup = useGetStudentsWithoutGroup();
  const students = useGetStudents();
  const session = useSession();
  const user = session?.data?.user;

  Permissions.hasPermission(user.role, "student:update") && students.refetch();

  if (session.status === "loading") return null;
  if (students.isError)
    return <Error message="Having some problem to fetch data." />;
  if (students.isSuccess && students?.data?.students.length === 0)
    return <Error message="Currently not exists any account." />;
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <TooltipProvider>
          {/* Total number of students */}
          <Tooltip>
            <TooltipTrigger className="!cursor-default">
              <Card>
                <CardHeader className="p-3 text-center">
                  <h1 className="text-body-18">Total Students</h1>
                </CardHeader>
                <CardContent className="text-center">
                  <h1 className="text-title-28">
                    {students?.data?.students?.length}
                  </h1>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              Total Number of Students in the semester.
            </TooltipContent>
          </Tooltip>
          {/* Student they are not in any group */}
          <Tooltip>
            <TooltipTrigger className="!cursor-default">
              <Link href="/coordinator/filtered-student">
                <Card>
                  <CardHeader className="p-3 text-center">
                    <h1 className="text-body-18">Not in any Group</h1>
                  </CardHeader>
                  <CardContent className="text-center">
                    <h1 className="text-title-28">
                      {studentsWithoutGroup?.data?.students?.length}
                    </h1>
                  </CardContent>
                </Card>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              Total Number of Students who are not in any group.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
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
          {/* Skelton */}
          <tbody className="divide-y">
            {students.isPending &&
              Array(15)
                .fill(0)
                .map((_, index) => (
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
            {students.isSuccess &&
              students.isSuccess &&
              students?.data?.students?.map((student, index) => (
                <TableRow
                  key={index}
                  onClick={() => {
                    setSelectedStudent(student);
                    setEditStudentModel(true);
                  }}
                  checkBox
                  onChange={(id, checked) => {
                    if (checked) {
                      setSelectedItem([...selectedItem, id]);
                    } else {
                      setSelectedItem(
                        selectedItem.filter((item) => item !== id)
                      );
                    }
                  }}
                  id={student._id}
                >
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
      </div>
      {/* {students.isSuccess && <Pagination
                totalPages={students?.data?.totalPages}
                setCurrentPage={e => setCurrentPage(e.selected + 1)}
                currentPage={currentPage} />} */}
      <Pagination
        totalPages={1}
        setCurrentPage={(e) => setCurrentPage(e.selected + 1)}
        currentPage={1}
      />
      <Dialog open={studentDeleteModel} onOpenChange={setStudentDeleteModel}>
        <StudentDeleteConfirmationModel
          data={studentDeleteModel}
          setData={setStudentDeleteModel}
          id={selectedStudent._id}
          deleteMode="single"
        />
      </Dialog>
      <Sheet open={editStudentModel} onOpenChange={setEditStudentModel}>
        <EditStudentModel
          data={editStudentModel}
          setData={setEditStudentModel}
          currentUserData={selectedStudent}
          setStudentDeleteModel={setStudentDeleteModel}
        />
      </Sheet>
    </>
  );
}
