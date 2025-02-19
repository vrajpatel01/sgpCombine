"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, LockOpen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SubmissionContext } from "../context/submissionContext";
import { SubmissionSkeleton } from "../components/submissionSkeleton";
import { Textarea } from "@/components/ui/textarea";
import { getSession } from "next-auth/react";
import { useGetGroupMembers } from "../../(group-profile)/services/query";

export default function WeekPage({ params: { week } }) {
  const {
    submission,
    addData,
    isEmpty,
    save,
    isPending,
    isValueChanged,
    lock,
    weekInfo,
  } = useContext(SubmissionContext);
  const isLock = submission?.isLocked;
  const groupMembersInfo = useGetGroupMembers();
  const [isLeader, setIsLeader] = useState(false);
  const [content, setContent] = useState({
    expectedOutcome: "",
    workDone: "",
    studentsWork: "",
    isLocked: false,
  });

  useEffect(() => {
    setContent(submission);
  }, [submission]);

  useEffect(() => {
    (async () => {
      const session = await getSession();
      const localUser = session?.user?.email;
      const leader = groupMembersInfo?.data?.students[0];
      setIsLeader(leader?.email == localUser);
    })();
  }, [groupMembersInfo.isLoading]);

  if (isPending?.get) {
    return <SubmissionSkeleton />;
  }

  return (
    <div className="space-y-5 w-full">
      <h1 className="text-2xl capitalize flex justify-start items-center gap-3">
        <span>{week.replace("-", " ")}</span>
        {isLock ? <Lock /> : <LockOpen />}
        {!!weekInfo?.data?.status && (
          <div className="text-xs px-2 py-1 rounded-full border-muted-foreground border-[1px] text-muted-foreground select-none">
            {weekInfo?.data?.status}
          </div>
        )}
      </h1>
      <Tabs defaultValue="eoapt">
        <TabsList className="bg-transparent p-0 border-b w-full justify-start rounded-none gap-5">
          <TabsTrigger
            className="p-[10px] !bg-transparent !shadow-none data-[state=active]:border-b border-black rounded-none"
            value="eoapt"
          >
            Team Work
          </TabsTrigger>
          <TabsTrigger
            className="p-[10px] !bg-transparent !shadow-none data-[state=active]:border-b border-black rounded-none"
            value="wd"
          >
            Your Work
          </TabsTrigger>

          <TabsTrigger
            disabled={
              weekInfo?.data?.rejectMessages?.length === 0 ||
              content?.expectedOutcome == ""
            }
            className="p-[10px] !bg-transparent !shadow-none data-[state=active]:border-b border-black rounded-none"
            value="feedbacks"
          >
            Feedbacks
          </TabsTrigger>
        </TabsList>
        <TabsContent value="eoapt">
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xl">Expected Outcome as per Timeline</span>
              <Textarea
                rows={13}
                disabled={!isLeader || isLock}
                defaultValue={content.expectedOutcome}
                onChange={(e) =>
                  addData({
                    expectedOutcome: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-3">
              <span className="text-xl">Work Done</span>
              <Textarea
                rows={13}
                disabled={!isLeader || isLock}
                defaultValue={content.workDone}
                onChange={(e) =>
                  addData({
                    workDone: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="wd">
          <Textarea
            rows={13}
            disabled={isLock}
            defaultValue={content.studentsWork ?? ""}
            onChange={(e) =>
              addData({
                studentsWork: e.target.value,
              })
            }
          />
        </TabsContent>
        <TabsContent value="feedbacks" className="space-y-5">
          {weekInfo?.data?.rejectMessages.map((message, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md border-[.5px] border-border flex flex-col gap-4"
            >
              <div>{message.msg}</div>
              <div className="text-gray-500 text-sm">
                {new Date(message.date).toDateString()}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
      {!isLock && (
        <div className="my-4 flex gap-4 w-full justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={save}
                  disabled={(isEmpty() && isPending.save) || !isValueChanged()}
                  className="px-10 bg-muted text-secondary-foreground hover:text-muted hover:bg-secondary-foreground space-x-3"
                >
                  {isPending.save && (
                    <Loader2 size={15} className="animate-spin" />
                  )}
                  <span>Save</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>After save you can able to change your submission.</p>
              </TooltipContent>
            </Tooltip>
            {isLeader && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={lock}
                    disabled={isEmpty() || isPending?.save}
                    className="px-10 space-x-3"
                  >
                    {isPending?.lock && (
                      <Loader2 size={15} className="animate-spin" />
                    )}
                    <span>Lock</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>After lock you can not change your submission</p>
                </TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}
