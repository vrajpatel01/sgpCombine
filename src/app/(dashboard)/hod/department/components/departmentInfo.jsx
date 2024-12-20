'use client';
import { IoSchool } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import { useMyInformation } from "../../settings/services/query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DepartmentInfo() {
    const myInformation = useMyInformation()
    if (myInformation.isPending) {
        return (
            <div className="bg-white rounded-md shadow-sm p-4 pt-0 divide-y-1 min-w-full" noValidate>
                <div className="py-3 flex justify-start items-center gap-4 w-full">
                    <IoSchool className="text-2xl" />
                    <span className="text-subtitle-18">Institute Information</span>
                </div>
                <div className="py-3 flex flex-col gap-4 w-full">
                    <div>
                        <Skeleton width={80} height={20} />
                        <Skeleton width='full' height={30} />
                    </div>
                    <div>
                        <Skeleton width={80} height={20} />
                        <Skeleton width='full' height={30} />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-start items-center gap-3 font-normal"><IoSchool className="text-2xl" /><span>Institute Information</span></CardTitle>
            </CardHeader>
            <CardContent>
                <div className="py-3 flex flex-col gap-4 w-full">
                    <div>
                        <div className="text-subtitle-18 font-medium mb-1">Institute</div>
                        <div className="text-body-16 ">{myInformation?.data?.hod?.institute?.name}</div>
                    </div>
                    <div>
                        <div className="text-subtitle-18 font-medium mb-1">Department</div>
                        <div className="text-body-16">{myInformation?.data?.hod?.department?.name}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}