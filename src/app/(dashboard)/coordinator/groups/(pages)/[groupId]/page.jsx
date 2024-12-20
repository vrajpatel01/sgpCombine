'use client';
import { useRouter } from "next/navigation";

// components
import GroupMemberInfo from "./components/groupMemberInfo";
import ProjectInformation from "./components/projectInformation";

// icons
import { IoIosArrowBack } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import Error from "@/components/shared/error";
import { useOneGroup } from "../../services/query";

export default function AssignFacultyToGroup({ params, searchParams }) {
    const router = useRouter();
    const groupId = params.groupId;
    const group = useOneGroup(groupId)

    if (group.isError) return <div className="h-screen w-full"><Error message="Group not found." /></div>
    return (
        <div className="h-full">
            <div className="header flex justify-between items-center gap-3">
                {group.isPending && <div className="md:w-[400px] w-full"><Skeleton height={50} /></div>}
                {group.isSuccess && <div className="flex justify-start items-center gap-3">
                    <IoIosArrowBack onClick={router.back} className="text-2xl cursor-pointer" />
                    <h1 className="text-title-28 mb-2 capitalize">{group?.data?.group?.projectInfo?.title}</h1>
                </div>}
            </div>
            {group.isPending && <div className="flex justify-start items-start flex-col-reverse lg:flex-row gap-5 mt-5 w-full">
                <div className="text-light-text flex justify-start items-start flex-col gap-3 w-full lg:w-[400px]">
                    <div className="w-full"><Skeleton height={70} /></div>
                    <div className="w-full"><Skeleton height={70} /></div>
                    <div className="w-full"><Skeleton height={70} /></div>
                    <div className="w-full"><Skeleton height={70} /></div>
                </div>
                <div className="grid grid-cols-1 gap-5 w-full">
                    <div className="w-full">
                        <Skeleton height={50} />
                    </div>
                    <div className="rounded-md w-full">
                        <Skeleton height={150} />
                        <Skeleton height={150} />
                        <Skeleton height={150} />
                    </div>
                </div>
            </div>}
            {group.isSuccess && <div className="flex justify-start items-start flex-col-reverse lg:flex-row gap-5 mt-5">
                <GroupMemberInfo group={group?.data?.group} />
                <ProjectInformation projectInfo={group?.data?.group?.projectInfo} />
            </div>}
        </div>
    )
}