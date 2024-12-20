import Skeleton from "react-loading-skeleton";
import { useGetFaculty } from "@/app/(dashboard)/faculty/faculty/services/query";

export default function FacultyInfoCard(facultyId) {
    const facultyInfo = useGetFaculty(facultyId.facultyId)

    if (facultyInfo.isPending) {
        return <div className="bg-white hidden lg:block sm:w-[400px] rounded-md shadow-sm overflow-hidden">
            <div className="text-light-text flex justify-start items-start flex-col gap-3 w-full py-4 px-5">
                <div className="w-full"><Skeleton height={40} /></div>
                <div className="w-full"><Skeleton height={40} /></div>
                <div className="w-full"><Skeleton height={40} /></div>
                <div className="w-full"><Skeleton height={40} /></div>
                <div className="w-full"><Skeleton height={40} /></div>
            </div>
        </div>
    }

    return (
        <div className="bg-white hidden lg:block sm:w-[400px] rounded-md shadow-sm overflow-hidden">
            <div className="text-title-24 py-4 px-5 bg-primary text-white capitalize">{facultyInfo?.data?.faculty?.name}</div>
            <div className="text-light-text flex justify-start items-start flex-col gap-3 w-full py-4 px-5">
                <div>
                    <div className="text-body-16 text-primary-text">Email</div>
                    <div className="text-body-16">{facultyInfo?.data?.faculty?.email}</div>
                </div>
                <div>
                    <div className="text-body-16 text-primary-text">Designation</div>
                    <div className="text-body-16">{facultyInfo?.data?.faculty?.designation}</div>
                </div>
                <div>
                    <div className="text-body-16 text-primary-text">Subject Name</div>
                    <div className="text-body-16">{facultyInfo?.data?.faculty?.subjectName}</div>
                </div>
                <div>
                    <div className="text-body-16 text-primary-text">Subject Code</div>
                    <div className="text-body-16">{facultyInfo?.data?.faculty?.subjectCode}</div>
                </div>
            </div>
        </div>
    )
}