'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TagInput } from "@/components/ui/tagInput";
import { Textarea } from "@/components/ui/textarea";
import { projectInfoSchema } from "@/validator/group-profile/projectInfo"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { GroupInfoContext } from "./context/useGroupInfoContext";
import { ProjectInformationSkeleton } from "@/components/group-profile/skeleton/projectInfo";
import { useSetProjectDetails, useUpdateProjectDetails } from "./services/mutation";
import { AlertCircle, CircleX, Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { ErrorComp } from "@/components/error";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Dashboard() {
    const { toast } = useToast()

    const { projectDetails, dates, isLoading } = useContext(GroupInfoContext)
    const updateProjectDetails = useUpdateProjectDetails();
    const saveProjectDetails = useSetProjectDetails();
    const queryClient = useQueryClient();

    const onSubmit = async (value) => {
        const data = {
            title: value.title,
            abstract: value.abstract,
            projectType: value.typeOfProject,
            domain: value.domain,
            appType: value.typeOfApplication,
            technologies: value.technologyAndTools,
            languages: value.languages
        }
        if (projectDetails?.data?.success !== true) {
            return saveProjectDetails.mutate(data, {
                onSuccess: async () => {
                    toast({
                        title: 'Project created',
                        description: 'Group project details created successfully',
                    })
                    await queryClient.invalidateQueries('project-details')
                    await queryClient.invalidateQueries('group-members')
                }
            })
        }


        updateProjectDetails.mutate(data, {
            onSuccess: async (data) => {
                if (data.success) {
                    toast({
                        title: 'Updated',
                        description: 'Project details updated successfully',
                        duration: 5000,
                    })
                    await queryClient.invalidateQueries('project-details')
                }
            }
        });
    }

    const form = useForm({
        resolver: zodResolver(projectInfoSchema),
        defaultValues: {
            title: projectDetails?.data?.data?.title,
            abstract: projectDetails?.data?.data?.abstract,
            typeOfProject: projectDetails?.data?.data?.projectType,
            typeOfApplication: projectDetails?.data?.data?.appType,
            domain: projectDetails?.data?.data?.domain,
            technologyAndTools: projectDetails?.data?.data?.technologies || [],
            languages: projectDetails?.data?.data?.languages || []
        }
    })

    useEffect(() => {
        if (projectDetails.isSuccess && projectDetails?.data?.success) {
            form.setValue('title', projectDetails?.data?.data?.title)
            form.setValue('abstract', projectDetails?.data?.data?.abstract)
            form.setValue('typeOfProject', projectDetails?.data?.data?.projectType)
            form.setValue('domain', projectDetails?.data?.data?.domain)
            form.setValue('typeOfApplication', projectDetails?.data?.data?.appType)
            form.setValue('technologyAndTools', projectDetails?.data?.data?.technologies)
            form.setValue('languages', projectDetails?.data?.data?.languages)
        }
    }, [projectDetails?.data, projectDetails.isSuccess, projectDetails.isPending, form])

    const error = projectDetails?.error?.response
    const isValidDate = !(dates.start && dates.end)
    const isLocked = !!projectDetails?.data && projectDetails?.data?.data?.isLocked
    const isLeader = !!projectDetails?.data && projectDetails?.data?.data?.isLeader

    if (isLoading.dates || isLoading.projectDetails) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Project Information</CardTitle>
                    <CardDescription>
                        Enter your basic project Information.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ProjectInformationSkeleton />
                </CardContent>
            </Card>
        )
    }

    if (error?.status == 500 || error?.status == 404) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Project Information</CardTitle>
                    <CardDescription>
                        Enter your basic project Information.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ErrorComp icon={<CircleX size={42} text="Having some issue please try again later" />} />
                </CardContent>
            </Card>
        )
    }
    const inGroup = !!projectDetails.data || !projectDetails?.error?.response?.status == 400;

    return (
        <div className="grid gap-6">
            {!isLocked && isValidDate &&
                <Alert variant="warn">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Action Required</AlertTitle>
                    <AlertDescription>
                        Your are missed the group locking date so please meet your project guid for further information.
                    </AlertDescription>
                </Alert>}
            <Card x-chunk="dashboard-04-chunk-1">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardHeader>
                            <CardTitle>Project Information</CardTitle>
                            <CardDescription>
                                Enter your basic project Information.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <FormField
                                controller={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input disabled={inGroup ? inGroup ? (isValidDate || isLocked) || !isLeader : false : false} {...field} placeholder="Title" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}>
                            </FormField>
                            <FormField
                                controller={form.control}
                                name="abstract"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea disabled={inGroup ? (isValidDate || isLocked) || !isLeader : false} rows={10} {...field} placeholder="Abstract" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}>
                            </FormField>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <FormField
                                    controller={form.control}
                                    name="typeOfProject"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Select disabled={inGroup ? (isValidDate || isLocked) || !isLeader : false} onValueChange={field.onChange} {...field}>
                                                    <SelectTrigger >
                                                        <SelectValue placeholder="Select type of project" />
                                                        <SelectContent>
                                                            <SelectItem value="Application">Application</SelectItem>
                                                            <SelectItem value="Research Oriented/Applied research">Research Oriented/Applied Research</SelectItem>
                                                        </SelectContent>
                                                    </SelectTrigger>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    controller={form.control}
                                    name="domain"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Select disabled={inGroup ? (isValidDate || isLocked) || !isLeader : false} onValueChange={field.onChange} {...field}>
                                                    <SelectTrigger >
                                                        <SelectValue placeholder="Select domain" />
                                                        <SelectContent>
                                                            <SelectItem value="AR/VR">AR/VR</SelectItem>
                                                            <SelectItem value="AI/ML/DL/Data Science">AI/ML/DL/Data Science</SelectItem>
                                                            <SelectItem value="IOT">IOT</SelectItem>
                                                            <SelectItem value="Blockchain">Blockchain</SelectItem>
                                                            <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                                                            <SelectItem value="Network security/Cyber security">Network security/Cyber Security</SelectItem>
                                                            <SelectItem value="Other">Other</SelectItem>
                                                        </SelectContent>
                                                    </SelectTrigger>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    controller={form.control}
                                    name="typeOfApplication"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Select disabled={inGroup ? (isValidDate || isLocked) || !isLeader : false} onValueChange={field.onChange} {...field}>
                                                    <SelectTrigger >
                                                        <SelectValue placeholder="Select type of application" />
                                                        <SelectContent>
                                                            <SelectItem value="Website">Website</SelectItem>
                                                            <SelectItem value="Mobile Application">Mobile application</SelectItem>
                                                            <SelectItem value="Desktop Application">Desktop application</SelectItem>
                                                        </SelectContent>
                                                    </SelectTrigger>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                            </div>

                            <FormField
                                controller={form.control}
                                name="technologyAndTools"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <TagInput disabled={inGroup ? (isValidDate || isLocked) || !isLeader : false} {...form} {...field} placeholder="Technology and tools" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)} />
                            <FormField
                                controller={form.control}
                                name="languages"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <TagInput disabled={inGroup ? (isValidDate || isLocked) || !isLeader : false} {...form} {...field} placeholder="Languages" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)} />
                        </CardContent>
                        {(inGroup ? (!isLocked && isLeader && !isValidDate) : true) &&
                            <CardFooter className="border-t px-6 py-4">
                                <Button disabled={updateProjectDetails.isPending || saveProjectDetails.isPending} type="submit">
                                    {(updateProjectDetails.isPending || saveProjectDetails.isPending) &&
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save
                                </Button>
                            </CardFooter>}
                    </form>
                </Form>
            </Card>
        </div>
    )
}
