"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useMe } from "./services/query";
import { Skeleton } from "@/components/ui/skeleton";
import GeneralSettingsBlock from "@/components/generalSettingBlock";
import { ChangePassword } from "./components/changePassword";

export default function SettingsPage() {
  const me = useMe();
  const data = me.data?.student;
  return (
    <div className="max-w-[800px] mx-auto space-y-5">
      <GeneralSettingsBlock
        title="Basic information"
        description="To update any information, please contact your guide."
      >
        <div>
          <Label htmlFor="name">Name</Label>
          {me.isPending && <Skeleton className="w-full h-9" />}
          {me.isSuccess && (
            <Input disabled id="name" placeholder="name" value={data.name} />
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          {me.isPending && <Skeleton className="w-full h-9" />}
          {me.isSuccess && (
            <Input
              disabled
              id="email"
              placeholder="example@example.com"
              value={data.email}
            />
          )}
        </div>
        <div>
          <Label htmlFor="enrollment">Enrollment</Label>
          {me.isPending && <Skeleton className="w-full h-9" />}
          {me.isSuccess && (
            <Input
              disabled
              id="enrollment"
              placeholder="X00XXXXXX"
              value={data.rollNumber}
            />
          )}
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          {me.isPending && <Skeleton className="w-full h-9" />}
          {me.isSuccess && (
            <Input
              disabled
              id="phoneNumber"
              placeholder="1234567890"
              value={data.phoneNumber}
            />
          )}
        </div>
        <div>
          <Label htmlFor="semester">Semester</Label>
          {me.isPending && <Skeleton className="w-full h-9" />}
          {me.isSuccess && (
            <Input
              disabled
              id="semester"
              placeholder="6"
              value={data.semester}
            />
          )}
        </div>
        <div>
          <Label htmlFor="division">Division</Label>
          {me.isPending && <Skeleton className="w-full h-9" />}
          {me.isSuccess && (
            <Input
              disabled
              id="division"
              placeholder="D"
              value={data.division}
            />
          )}
        </div>
        <div>
          <Label htmlFor="division">Institute</Label>
          {me.isPending && <Skeleton className="w-full h-9" />}
          {me.isSuccess && (
            <Input
              disabled
              id="institute"
              placeholder="D"
              value={data.institute.name}
            />
          )}
        </div>
        <div>
          <Label htmlFor="division">Department</Label>
          {me.isPending && <Skeleton className="w-full h-9" />}
          {me.isSuccess && (
            <Input
              disabled
              id="department"
              placeholder="D"
              value={data.department.name}
            />
          )}
        </div>
      </GeneralSettingsBlock>
      <ChangePassword />
      <GeneralSettingsBlock
        className="border-t-[1px] border-border pt-5"
        title="Sign out"
        description=""
      >
        <div className="text-muted-foreground text-sm">
          End your session and securely sign out of your account. Make sure to
          save any changes before signing out to avoid losing your progress.
        </div>
        <Button onClick={() => signOut()} variant="destructive">
          Sign out
        </Button>
      </GeneralSettingsBlock>
    </div>
  );
}
