// components
import Skeleton from "react-loading-skeleton";
import { useGetAllGroups, useGetAllGroupsCoordinator } from "../services/query";
import GroupInfoItem from "./groupInfoItem";
import Error from "@/components/shared/error";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Permissions } from "@/lib/permissions";
import { useSession } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function GroupsData() {
  const groups = useGetAllGroups();
  const allGroups = useGetAllGroupsCoordinator();
  const session = useSession();
  const user = session?.data?.user;
  if (session.status == "loading") return null;

  Permissions.hasPermission(user.role, "groups:view-all") &&
    allGroups.refetch();
  if (groups.isError)
    return <Error message="Having some problem to fetch data." />;
  return (
    <Tabs defaultValue="my-groups">
      {Permissions.hasPermission(user.role, "groups:view-all") && (
        <TabsList>
          <TabsTrigger value="my-groups" default>
            My Groups
          </TabsTrigger>
          <TabsTrigger value="all-groups">All Groups</TabsTrigger>
        </TabsList>
      )}
      <TabsContent value="my-groups">
        {groups?.data?.data?.length === 0 ? (
          <div className="flex justify-center items-center h-screen w-full">
            <div className="text-xl text-muted-foreground">
              No groups found.
            </div>
          </div>
        ) : (
          groups.isPending &&
          Array(20)
            .fill(0)
            .map((_, i) => <Skeleton height={150} />)
        )}
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <TooltipProvider>
              {/* Total number of groups */}
              <Tooltip>
                <TooltipTrigger className="!cursor-default">
                  <Card>
                    <CardHeader className="p-3 text-center">
                      <h1 className="text-body-18">Total Groups</h1>
                    </CardHeader>
                    <CardContent className="text-center">
                      <h1 className="text-title-28">1</h1>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  Total Number of Groups assigned to you.
                </TooltipContent>
              </Tooltip>
              {/* Total number of groups */}
              <Tooltip>
                <TooltipTrigger className="!cursor-default">
                  <Card>
                    <CardHeader className="p-3 text-center">
                      <h1 className="text-body-18">Pending Weekly Report</h1>
                    </CardHeader>
                    <CardContent className="text-center">
                      <h1 className="text-title-28">3</h1>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  Total Number of groups that have not submitted their weekly
                  report.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {groups.isSuccess &&
              groups?.data?.data.map((group) => (
                <GroupInfoItem group={group} link={`/groups/${group._id}`} />
              ))}
          </div>
        </div>
      </TabsContent>
      {Permissions.hasPermission(user.role, "groups:view-all") && (
        <TabsContent value="all-groups">
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <TooltipProvider>
                {/* Total number of groups */}
                <Tooltip>
                  <TooltipTrigger className="!cursor-default h-full">
                    <Card>
                      <CardHeader className="p-3 text-center">
                        <h1 className="text-body-18">Total Groups</h1>
                      </CardHeader>
                      <CardContent className="text-center">
                        <h1 className="text-title-28">1</h1>
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    Total Number of Groups assigned to you.
                  </TooltipContent>
                </Tooltip>
                {/* Total number of groups */}
                <Tooltip>
                  <TooltipTrigger className="!cursor-default">
                    <Card>
                      <CardHeader className="p-3 text-center">
                        <h1 className="text-body-18">Pending Weekly Report</h1>
                      </CardHeader>
                      <CardContent className="text-center">
                        <h1 className="text-title-28">3</h1>
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    Total Number of groups that have not submitted their weekly
                    report.
                  </TooltipContent>
                </Tooltip>
                {/* Total number of groups */}
                <Tooltip>
                  <TooltipTrigger className="!cursor-default">
                    <Card>
                      <CardHeader className="p-3 text-center">
                        <h1 className="text-body-18">Unlocked Groups</h1>
                      </CardHeader>
                      <CardContent className="text-center">
                        <h1 className="text-title-28">3</h1>
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    Number of groups that are not locked their groups.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {allGroups.isSuccess &&
                allGroups?.data?.data.map((group) => (
                  <GroupInfoItem group={group} link={`/groups/${group._id}`} />
                ))}
            </div>
          </div>
        </TabsContent>
      )}
    </Tabs>
  );
}
