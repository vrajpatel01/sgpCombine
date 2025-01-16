"use client";
import { useRouter } from "next/navigation";

// components
import GroupMemberInfo from "./components/groupMemberInfo";
import ProjectInformation from "./components/projectInformation";

// icons
import { IoIosArrowBack } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import Error from "@/components/shared/error";
import { useOneGroup } from "../../services/query";
import { Button } from "@/components/ui/button";
import { IoLockClosed, IoLockOpen } from "react-icons/io5";
import { useUpdateGroupLockStatus } from "../../services/mutation";
import { useToast } from "@/hooks/use-toast";

export default function AssignFacultyToGroup({ params, searchParams }) {
  const { toast } = useToast();
  const router = useRouter();
  const groupId = params.groupId;
  const group = useOneGroup(groupId);
  const updateLockStatus = useUpdateGroupLockStatus();

  const updateLock = (status) => {
    updateLockStatus.mutate(
      { groupId, status },
      {
        onSuccess: (data) => {
          if (data.success) {
            group.refetch();
            toast({
              title: "Success",
              description: "Group lock is updated successfully",
            });
          }
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: "Something went wrong",
          });
        },
      }
    );
  };

  if (group.isError)
    return (
      <div className="h-screen w-full">
        <Error message="Group not found." />
      </div>
    );

  return (
    <div className="h-full">
      <div className="header flex justify-between items-center gap-3">
        {group.isPending && (
          <div className="md:w-[400px] w-full">
            <Skeleton height={50} />
          </div>
        )}
        {group.isSuccess && (
          <div className="flex justify-between items-center gap-5 w-full">
            <div className="flex justify-start items-center gap-3">
              <IoIosArrowBack
                onClick={router.back}
                className="text-2xl cursor-pointer"
              />
              <h1 className="text-title-28 mb-2 capitalize">
                {/* {group?.data?.group?.projectInfo?.title} */}
                {group?.data?.group?.groupId}
              </h1>
              <div className="bg-muted-foreground p-2 rounded-md text-white text-xl">
                {group?.data?.group?.isLocked ? (
                  <IoLockClosed />
                ) : (
                  <IoLockOpen />
                )}
              </div>
            </div>
            <div>
              {!group?.data?.group?.isLocked ? (
                <Button
                  variant="destructive"
                  disabled={updateLockStatus.isPending}
                  onClick={() => updateLock(true)}
                >
                  <IoLockClosed />
                  {updateLockStatus.isPending && <Loader2 size={18} />}
                  <span>Lock</span>
                </Button>
              ) : (
                <Button
                  disabled={updateLockStatus.isPending}
                  onClick={() => updateLock(false)}
                >
                  <IoLockOpen />
                  {updateLockStatus.isPending && <Loader2 size={18} />}
                  <span>Unlock</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      {group.isPending && (
        <div className="flex justify-start items-start flex-col-reverse lg:flex-row gap-5 mt-5 w-full">
          <div className="text-light-text flex justify-start items-start flex-col gap-3 w-full lg:w-[400px]">
            <div className="w-full">
              <Skeleton height={70} />
            </div>
            <div className="w-full">
              <Skeleton height={70} />
            </div>
            <div className="w-full">
              <Skeleton height={70} />
            </div>
            <div className="w-full">
              <Skeleton height={70} />
            </div>
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
        </div>
      )}
      {group.isSuccess && (
        <div className="flex justify-start items-start flex-col-reverse lg:flex-row gap-5 mt-5">
          <GroupMemberInfo group={group?.data?.group} />
          <ProjectInformation projectInfo={group?.data?.group?.projectInfo} />
        </div>
      )}
    </div>
  );
}
