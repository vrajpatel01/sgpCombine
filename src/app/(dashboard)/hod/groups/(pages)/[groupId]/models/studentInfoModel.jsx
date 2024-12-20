import Skeleton from "react-loading-skeleton"
import { SheetContent } from "@/components/ui/sheet"
import { useGetOneStudent } from "@/app/(dashboard)/hod/students/services/query"

export default function StudentInformationModel({ studentId, data, setData }) {
    const getStudentInfo = useGetOneStudent(studentId)

    return (
        <SheetContent>
            <div className="overflow-x-scroll h-full flex justify-between flex-col" noValidate>
                <div>
                    <h1 className="text-title-24 mb-4 font-medium capitalize">{getStudentInfo?.data?.student?.name}</h1>
                    <div className="flex flex-col gap-5">
                        <div>
                            <h1 className="text-primary-text text-body-16 font-medium">Roll Number</h1>
                            {getStudentInfo.isPending && <Skeleton height={40} />}
                            {getStudentInfo.isSuccess && <p className="text-light-text p-2 rounded-md bg-secondary-background border-border border-1">{getStudentInfo?.data?.student?.rollNumber}</p>}
                        </div>
                        <div>
                            <h1 className="text-primary-text text-body-16 font-medium">Email</h1>
                            {getStudentInfo.isPending && <Skeleton height={40} />}
                            {getStudentInfo.isSuccess && <p className="text-light-text p-2 rounded-md bg-secondary-background border-border border-1 mt-1">{getStudentInfo?.data?.student?.email}</p>}
                        </div>
                        <div>
                            <h1 className="text-primary-text text-body-16 font-medium">Phone Number</h1>
                            {getStudentInfo.isPending && <Skeleton height={40} />}
                            {getStudentInfo.isSuccess && <p className="text-light-text p-2 rounded-md bg-secondary-background border-border border-1 mt-1">{getStudentInfo?.data?.student?.phoneNumber}</p>}
                        </div>
                        <div>
                            <h1 className="text-primary-text text-body-16 font-medium">Institute</h1>
                            {getStudentInfo.isPending && <Skeleton height={40} />}
                            {getStudentInfo.isSuccess && <p className="text-light-text p-2 rounded-md bg-secondary-background border-border border-1 mt-1">{getStudentInfo?.data?.student?.institute?.name}</p>}
                        </div>
                        <div>
                            <h1 className="text-primary-text text-body-16 font-medium">Department</h1>
                            {getStudentInfo.isPending && <Skeleton height={40} />}
                            {getStudentInfo.isSuccess && <p className="text-light-text p-2 rounded-md bg-secondary-background border-border border-1 mt-1">{getStudentInfo?.data?.student?.department?.name}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <h1 className="text-primary-text text-body-16 font-medium">Semester</h1>
                                {getStudentInfo.isPending && <Skeleton height={40} />}
                                {getStudentInfo.isSuccess && <p className="text-light-text p-2 rounded-md bg-secondary-background border-border border-1 mt-1">{getStudentInfo?.data?.student?.semester}</p>}
                            </div>
                            <div>
                                <h1 className="text-primary-text text-body-16 font-medium">Division</h1>
                                {getStudentInfo.isPending && <Skeleton height={40} />}
                                {getStudentInfo.isSuccess && <p className="text-light-text p-2 rounded-md bg-secondary-background border-border border-1 mt-1">{getStudentInfo?.data?.student?.division}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SheetContent>
    )
}