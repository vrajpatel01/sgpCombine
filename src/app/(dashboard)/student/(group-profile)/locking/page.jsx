'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useContext } from "react";
import { GroupInfoContext } from "../context/useGroupInfoContext";
import { Badge } from "@/components/ui/badge";
import { CircleX, CopyX, Loader2, Lock, LockOpen } from "lucide-react";
import { ProjectInformationSkeleton } from "@/components/group-profile/skeleton/projectInfo";
import { ErrorComp } from "@/components/error";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "../group-members/components/data-table";
import { columns } from "../group-members/components/columns";
import { useSetGroupLock } from "../services/mutation";
import { useGenerateCertificate, useGenerateCoverPage } from "../services/query";

export default function LockingPage() {
    const { projectDetails, dates, isLoading, groupMembersInfo } = useContext(GroupInfoContext);
    const lock = useSetGroupLock();
    const generateCertificate = useGenerateCertificate();
    const generateCoverPage = useGenerateCoverPage();

    const projectDetailsSchema = z.object({
        verify: z.boolean().refine(value => value === true, {
            message: 'Please verify the project details'
        })
    })

    const form = useForm({
        resolver: zodResolver(projectDetailsSchema),
        defaultValue: {
            verify: ''
        }
    })

    function onSubmit() {
        lock.mutate();
    }

    const projectError = projectDetails?.error?.response;
    const groupError = groupMembersInfo?.error?.response;
    const datesError = dates?.error?.response;

    if (isLoading.dates || isLoading.groupMembersInfo || isLoading.projectDetails) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Locking</CardTitle>
                    <CardDescription>Verify your project and group details and lock it.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProjectInformationSkeleton />
                </CardContent>
            </Card>
        )
    }

    if ((projectError?.status == 500 || projectError?.status == 404) ||
        (groupError?.status == 500 || groupError?.status == 404) ||
        (datesError?.status == 500 || datesError?.status == 404)) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Locking</CardTitle>
                    <CardDescription>Verify your project and group details and lock it.</CardDescription>
                </CardHeader>
                <CardContent className="py-20 border-t">
                    <ErrorComp icon={<CircleX size={42} />} text="Having some issue please try again later" />
                </CardContent>
            </Card>
        )
    }

    if (!projectDetails?.data || !groupMembersInfo?.data) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Locking</CardTitle>
                    <CardDescription>Verify your project and group details and lock it.</CardDescription>
                </CardHeader>
                <CardContent className="py-20 border-t">
                    <ErrorComp icon={<CircleX size={42} />} text="No data available." />
                </CardContent>
            </Card>
        )
    }


    return (
        <div className="space-y-5 pb-5 overflow-hidden">
            <div className="space-y-5">
                {/* {!projectDetails?.data?.data?.isLocked && dates.start && dates.end && */}
                {/* <Card>
                    <CardHeader>
                        <CardTitle>Download Certificate</CardTitle>
                    </CardHeader>
                    <CardContent className="border-t px-6 py-4 space-y-3">
                        <p className="text-sm text-gray-500">You can download your certificate and project report cover page from here after completing your project and weekly reports submission.</p>
                        <div className="flex justify-end items-center gap-2">
                            <Button onClick={() => generateCertificate.refetch()}>Certificate</Button>
                            <Button onClick={() => generateCoverPage.refetch()}>Cover Page</Button>
                        </div>
                    </CardContent>
                </Card> */}
                <Card>
                    <CardHeader>
                        <CardTitle>Title</CardTitle>
                    </CardHeader>
                    <CardContent className="border-t px-6 py-4">
                        {projectDetails?.data?.data?.title}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Abstract</CardTitle>
                    </CardHeader>
                    <CardContent className="border-t px-6 py-4 text-justify">
                        {projectDetails?.data?.data?.abstract}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Project Objective And Scope</CardTitle>
                    </CardHeader>
                    <CardContent className="border-t px-6 py-4 text-justify">
                        {projectDetails?.data?.data?.ProjectObjectivesAndScope}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Background Study of Existing System</CardTitle>
                    </CardHeader>
                    <CardContent className="border-t px-6 py-4 text-justify">
                        {projectDetails?.data?.data?.BackgroundStudyOfExistingSystem}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Methodology/Approach</CardTitle>
                    </CardHeader>
                    <CardContent className="border-t px-6 py-4 text-justify">
                        {projectDetails?.data?.data?.Methodology_Approach}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Tentative Project Plan/Timeline</CardTitle>
                    </CardHeader>
                    <CardContent className="border-t px-6 py-4 text-justify">
                        {projectDetails?.data?.data?.TentativeProjectPlan_Timeline}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Individual Role</CardTitle>
                    </CardHeader>
                    <CardContent className="border-t px-6 py-4 text-justify">
                        {projectDetails?.data?.data?.IndividualRole}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Innovation/Novelty</CardTitle>
                    </CardHeader>
                    <CardContent className="border-t px-6 py-4 text-justify">
                        {projectDetails?.data?.data?.Innovation_Novelty}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Expected Outcome</CardTitle>
                    </CardHeader>
                    <CardContent className="border-t px-6 py-4 text-justify">
                        {projectDetails?.data?.data?.ExpectedOutcome}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Type of Application</CardTitle>
                    </CardHeader>
                    <CardContent className="border-t px-6 py-4">
                        {projectDetails?.data?.data?.appType}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Domain</CardTitle>
                    </CardHeader>
                    <CardContent className="border-t px-6 py-4">
                        {projectDetails?.data?.data?.domain}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Type of Project</CardTitle>
                    </CardHeader>
                    <CardContent className="border-t px-6 py-4">
                        {projectDetails?.data?.data?.projectType}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Technology/Tools</CardTitle>
                    </CardHeader>
                    <CardContent className="border-t px-6 py-4">
                        <div className="space-x-2 space-y-2">
                            {projectDetails?.data?.data?.technologies.map((item, i) => (
                                <Badge className='p-2 px-4 bg-secondary-foreground hover:bg-secondary-foreground select-none' key={i}>{item}</Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Languages</CardTitle>
                    </CardHeader>
                    <CardContent className="border-t px-6 py-4">
                        <div className="space-x-2 space-y-2">
                            {projectDetails?.data?.data?.languages.map((item, i) => (
                                <Badge className='p-2 px-4 bg-secondary-foreground hover:bg-secondary-foreground select-none' key={i}>{item}</Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Members</CardTitle>
                    </CardHeader>
                    <CardContent className="border-t px-6 py-4">
                        <div className="space-x-2 space-y-2">
                            <DataTable checkbox={false} columns={columns} data={groupMembersInfo?.data?.students} />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-start items-center gap-4">Locking <span>{projectDetails?.data?.data?.isLocked ? <Lock size={20} /> : <LockOpen size={20} />}</span></CardTitle>
                        <CardDescription>If you confirm, then you should lock your project submission form before end date. If you leave your locking deadline then your project is not submitted and you need meet your SGP professor for further guidance.</CardDescription>
                    </CardHeader>
                    {projectDetails?.data?.data?.isLeader && !projectDetails?.data?.data?.isLocked && dates.start && dates.end &&
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <CardContent className="space-y-3">
                                    <FormField
                                        name="verify"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox onCheckedChange={(e) => {
                                                            form.setValue('verify', e)
                                                        }} id="verify" />
                                                        <FormLabel htmlFor="verify" className="text-sm font-medium leading-none" >
                                                            I have verified that the report mentioned below is accurate.
                                                        </FormLabel>
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )} />


                                    <Button disabled={lock.isPending} className="border-t px-6 py-4">
                                        {lock.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        <span>Lock</span>
                                    </Button>
                                </CardContent>
                            </form>
                        </Form>}
                </Card>
            </div>
        </div>
    )
}