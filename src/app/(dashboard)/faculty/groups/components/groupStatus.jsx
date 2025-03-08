"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetGroupSubmissionStatus } from "../../filtered-group/services/query";
import { useGetAllGroups } from "../services/query";

export const GroupStatusComp = () => {
  const groupsStatus = useGetGroupSubmissionStatus();
  const groups = useGetAllGroups();
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <TooltipProvider>
        {/* Total number of groups */}
        <Tooltip>
          <TooltipTrigger className="!cursor-default">
            <Link href="/faculty/filtered-group">
              <Card>
                <CardHeader className="p-3 text-center">
                  <h1 className="text-body-18">Total Groups</h1>
                </CardHeader>
                <CardContent className="text-center">
                  <h1 className="text-title-28">
                    {groups.isSuccess && groups?.data?.data?.length}
                  </h1>
                </CardContent>
              </Card>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            Total Number of Groups assigned to you.
          </TooltipContent>
        </Tooltip>
        {/* Total number of groups */}
        <Tooltip>
          <TooltipTrigger className="!cursor-default">
            <Link href="/faculty/filtered-group">
              6
              <Card>
                <CardHeader className="p-3 text-center">
                  <h1 className="text-body-18">Pending Weekly Report</h1>
                </CardHeader>
                <CardContent className="text-center">
                  <h1 className="text-title-28">
                    {groupsStatus.isSuccess &&
                      groupsStatus?.data?.data?.notSubmitted?.length}
                  </h1>
                </CardContent>
              </Card>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            Total Number of groups that have not submitted their weekly report.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
