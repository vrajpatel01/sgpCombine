"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LockGroupComp } from "./components/locked-group";
import { NotSubmittedGroupComp } from "./components/not-submitted-group";
import { UnlockGroupComp } from "./components/unlocked";
import { SubmittedGroupComp } from "./components/submitted";

export default function FilteredGroup() {
  return (
    <>
      <div>
        <Tabs defaultValue="submitted">
          <TabsList>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="not-submitted">Not Submitted</TabsTrigger>
            <TabsTrigger value="locked">Locked</TabsTrigger>
            <TabsTrigger value="unlocked">Unlocked</TabsTrigger>
          </TabsList>
          <TabsContent value="submitted">
            <SubmittedGroupComp />
          </TabsContent>
          <TabsContent value="not-submitted">
            <NotSubmittedGroupComp />
          </TabsContent>
          <TabsContent value="locked">
            <LockGroupComp />
          </TabsContent>
          <TabsContent value="unlocked">
            <UnlockGroupComp />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
