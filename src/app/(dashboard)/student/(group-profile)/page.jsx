"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagInput } from "@/components/ui/tagInput";
import { Textarea } from "@/components/ui/textarea";
import { projectInfoSchema } from "@/validator/group-profile/projectInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GroupInfoContext } from "./context/useGroupInfoContext";
import { ProjectInformationSkeleton } from "@/components/group-profile/skeleton/projectInfo";
import {
  useDeleteGroup,
  useSetProjectDetails,
  useUpdateProjectDetails,
} from "./services/mutation";
import { AlertCircle, CircleX, Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { ErrorComp } from "@/components/error";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { BsFillInfoCircleFill } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useOnboarding } from "../hook/useOnboarding";

export default function Dashboard() {
  const { toast } = useToast();
  const { projectDetails, dates, isLoading } = useContext(GroupInfoContext);
  const [leaderConfirmation, setLeaderConfirmation] = useState(false);
  const [deleteGroupDialog, setDeleteGroupDialog] = useState(false);
  const updateProjectDetails = useUpdateProjectDetails();
  const saveProjectDetails = useSetProjectDetails();
  const queryClient = useQueryClient();
  const deleteGroup = useDeleteGroup();
  const { onboardingStatus, updateOnboarding } = useOnboarding();
  const [otherField, setOtherField] = useState({
    field: false,
    value: "",
  });
  const domain = [
    "AR/VR",
    "AI/ML/DL/Data Science",
    "IOT",
    "Blockchain",
    "Cloud Computing",
    "Network security/Cyber security",
    "Other",
  ];

  const onSubmit = async (value) => {
    const data = {
      title: value.title,
      abstract: value.abstract,
      ProjectObjectivesAndScope: value.projectObjectiveAndScope,
      BackgroundStudyOfExistingSystem: value.backgroundStudyOfExistingSystem,
      Methodology_Approach: value.methodologyAndApproach,
      TentativeProjectPlan_Timeline: value.tentativeProjectPlan,
      IndividualRole: value.individualRole,
      Innovation_Novelty: value.innovation,
      ExpectedOutcome: value.expectedOutcome,
      projectType: value.typeOfProject,
      domain: otherField.field ? otherField.value : value.domain,
      appType: value.typeOfApplication,
      technologies: value.technologyAndTools,
      languages: value.languages,
    };

    if (projectDetails?.data?.success !== true) {
      return saveProjectDetails.mutate(data, {
        onSuccess: async () => {
          toast({
            title: "Project created",
            description: "Group project details created successfully",
          });
          await queryClient.invalidateQueries("project-details");
          await queryClient.invalidateQueries("group-members");
        },
      });
    }

    updateProjectDetails.mutate(data, {
      onSuccess: async (data) => {
        if (data.success) {
          toast({
            title: "Updated",
            description: "Project details updated successfully",
          });
          await queryClient.invalidateQueries("project-details");
        }
      },
    });
  };

  const deleteGroupData = async () => {
    deleteGroup.mutate("", {
      onSuccess: async (data) => {
        if (data.success) {
          updateOnboarding(2);
          window.location.reload();
        }
      },
    });
  };

  const form = useForm({
    resolver: zodResolver(projectInfoSchema),
    defaultValues: {
      title: projectDetails?.data?.data?.title,
      abstract: projectDetails?.data?.data?.abstract,
      projectObjectiveAndScope:
        projectDetails?.data?.data?.ProjectObjectivesAndScope,
      backgroundStudyOfExistingSystem:
        projectDetails?.data?.data?.BackgroundStudyOfExistingSystem,
      methodologyAndApproach: projectDetails?.data?.data?.Methodology_Approach,
      tentativeProjectPlan:
        projectDetails?.data?.data?.TentativeProjectPlan_Timeline,
      individualRole: projectDetails?.data?.data?.IndividualRole,
      innovation: projectDetails?.data?.data?.Innovation_Novelty,
      expectedOutcome: projectDetails?.data?.data?.ExpectedOutcome,
      typeOfProject: projectDetails?.data?.data?.projectType,
      typeOfApplication: projectDetails?.data?.data?.appType,
      domain: domain.includes(projectDetails?.data?.data?.domain)
        ? projectDetails?.data?.data?.domain
        : "Other",
      technologyAndTools: projectDetails?.data?.data?.technologies || [],
      languages: projectDetails?.data?.data?.languages || [],
    },
  });

  useEffect(() => {
    if (projectDetails.isSuccess && projectDetails?.data?.success) {
      form.setValue("title", projectDetails?.data?.data?.title);
      form.setValue("abstract", projectDetails?.data?.data?.abstract);
      form.setValue(
        "projectObjectiveAndScope",
        projectDetails?.data?.data?.ProjectObjectivesAndScope
      );
      form.setValue(
        "backgroundStudyOfExistingSystem",
        projectDetails?.data?.data?.BackgroundStudyOfExistingSystem
      );
      form.setValue(
        "methodologyAndApproach",
        projectDetails?.data?.data?.Methodology_Approach
      );
      form.setValue(
        "tentativeProjectPlan",
        projectDetails?.data?.data?.TentativeProjectPlan_Timeline
      );
      form.setValue(
        "individualRole",
        projectDetails?.data?.data?.IndividualRole
      );
      form.setValue(
        "innovation",
        projectDetails?.data?.data?.Innovation_Novelty
      );
      form.setValue(
        "expectedOutcome",
        projectDetails?.data?.data?.ExpectedOutcome
      );
      form.setValue("typeOfProject", projectDetails?.data?.data?.projectType);
      form.setValue(
        "domain",
        domain.includes(projectDetails?.data?.data?.domain)
          ? projectDetails?.data?.data?.domain
          : "Other"
      );
      if (!domain.includes(projectDetails?.data?.data?.domain))
        setOtherField({
          field: true,
          value: projectDetails?.data?.data?.domain,
        });
      form.setValue("typeOfApplication", projectDetails?.data?.data?.appType);
      form.setValue(
        "technologyAndTools",
        projectDetails?.data?.data?.technologies
      );
      form.setValue("languages", projectDetails?.data?.data?.languages);
    }
  }, [
    projectDetails?.data,
    projectDetails.isSuccess,
    projectDetails.isPending,
    form,
  ]);
  const error = projectDetails?.error?.response;
  const isValidDate = !(dates.start && dates.end);
  const isLocked =
    !!projectDetails?.data && projectDetails?.data?.data?.isLocked;
  const isLeader =
    !!projectDetails?.data && projectDetails?.data?.data?.isLeader;

  useEffect(() => {
    if (projectDetails.isSuccess && projectDetails?.data?.success) {
      setLeaderConfirmation(true);
    }
  }, [projectDetails.isSuccess]);

  if (isLoading.dates || isLoading.projectDetails) {
    return (
      <Card className="!w-full">
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
    );
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
          <ErrorComp
            icon={<CircleX size={42} />}
            text={
              projectDetails?.error?.response?.data?.message ??
              "Having some issue please try again later"
            }
          />
        </CardContent>
      </Card>
    );
  }
  const inGroup =
    !!projectDetails.data || !projectDetails?.error?.response?.status == 400;

  return (
    <TooltipProvider>
      <div className="grid gap-6 pb-5">
        {!isLocked && isValidDate && (
          <Alert variant="warn">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Action Required</AlertTitle>
            <AlertDescription>
              Your are missed the group locking date so please meet your project
              guid for further information.
            </AlertDescription>
          </Alert>
        )}
        <Card x-chunk="dashboard-04-chunk-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader className="space-y-2">
                <CardTitle>Project Information</CardTitle>
                <CardDescription>
                  Enter your basic project Information.
                </CardDescription>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important Note</AlertTitle>
                  <AlertDescription className="space-y-2">
                    <div>
                      Only the group leader should fill out this form. Other
                      group members do not need to fill it. If any other member
                      fills out the form by mistake, please delete their group
                      data to join your leader.
                    </div>
                    {onboardingStatus === 3 &&
                      projectDetails.data == undefined && (
                        <div>
                          Or if you are not the leader of the group, please
                          select I'm Member button.
                        </div>
                      )}
                    {onboardingStatus === 3 &&
                      projectDetails.data == undefined && (
                        <Button
                          type="button"
                          className="text-center !px-5"
                          onClick={() => updateOnboarding(2)}
                        >
                          I'm Member
                        </Button>
                      )}
                    {projectDetails.data !== undefined &&
                      !isLocked &&
                      isLeader && (
                        <Button
                          type="button"
                          variant="destructive"
                          className="text-center !px-5"
                          onClick={() => {
                            setDeleteGroupDialog(true);
                          }}
                        >
                          Delete Data
                        </Button>
                      )}
                  </AlertDescription>
                </Alert>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Project Title */}
                <FormField
                  controller={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <Tooltip>
                        <TooltipTrigger>
                          <FormLabel className="flex justify-start items-center gap-2">
                            Project Title <BsFillInfoCircleFill />
                          </FormLabel>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div>Enter your project title here.</div>
                        </TooltipContent>
                      </Tooltip>
                      <FormControl>
                        <Input
                          disabled={
                            inGroup
                              ? inGroup
                                ? isValidDate || isLocked || !isLeader
                                : false
                              : false
                          }
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.trimStart())
                          }
                          placeholder="Title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                {/* Abstract */}
                <FormField
                  controller={form.control}
                  name="abstract"
                  render={({ field }) => (
                    <FormItem>
                      <Tooltip>
                        <TooltipTrigger>
                          <FormLabel className="flex justify-start items-center gap-2">
                            Abstract
                            <BsFillInfoCircleFill />
                          </FormLabel>
                        </TooltipTrigger>
                        <TooltipContent className="w-screen sm:w-auto">
                          <div>
                            A problem statement in a project clearly defines the
                            issue that needs to be solved.{" "}
                            <br className="hidden sm:block" />
                            It explains what the problem is, why it matters, and
                            show the problem's impact.{" "}
                            <br className="hidden sm:block" />
                            This helps focus the project and guides the
                            development of effective solutions.
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      <FormControl>
                        <Textarea
                          disabled={
                            inGroup
                              ? isValidDate || isLocked || !isLeader
                              : false
                          }
                          rows={10}
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.trimStart())
                          }
                          placeholder="Abstract"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                {/* Project Objectives and Scope */}
                <FormField
                  controller={form.control}
                  name="projectObjectiveAndScope"
                  render={({ field }) => (
                    <FormItem>
                      <Tooltip>
                        <TooltipTrigger>
                          <FormLabel className="flex justify-start items-center gap-2">
                            Project Objectives and Scope
                            <BsFillInfoCircleFill />
                          </FormLabel>
                        </TooltipTrigger>
                        <TooltipContent className="w-screen sm:w-auto">
                          <b>Project objectives</b> are specific, measurable
                          goals that the project aims to achieve.{" "}
                          <br className="hidden sm:block" />
                          They provide a clear direction and serve as benchmarks
                          for evaluating the project's success. <br />
                          <br />
                          <b>Scope:</b> The project scope outlines the
                          boundaries and deliverables of the project, detailing
                          what will and will not be included.{" "}
                          <br className="hidden sm:block" /> It sets the context
                          for what the project will accomplish and helps manage
                          stakeholder expectations.
                        </TooltipContent>
                      </Tooltip>
                      <FormControl>
                        <Textarea
                          disabled={
                            inGroup
                              ? isValidDate || isLocked || !isLeader
                              : false
                          }
                          rows={10}
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.trimStart())
                          }
                          placeholder="Project Objectives and Scope"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                {/* Background Study of Existing System */}
                <FormField
                  controller={form.control}
                  name="backgroundStudyOfExistingSystem"
                  render={({ field }) => (
                    <FormItem>
                      <Tooltip>
                        <TooltipTrigger>
                          <FormLabel className="flex justify-start items-center gap-2">
                            Background Study of Existing System
                            <BsFillInfoCircleFill />
                          </FormLabel>
                        </TooltipTrigger>
                        <TooltipContent className="w-screen sm:w-auto">
                          <div>
                            The background study involves an examination of the
                            existing relevant systems or technology that the
                            project seeks to improve or replace.{" "}
                            <br className="hidden sm:block" /> This includes an
                            analysis of its architecture, functionalities,
                            strengths, and weaknesses.
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      <FormControl>
                        <Textarea
                          disabled={
                            inGroup
                              ? isValidDate || isLocked || !isLeader
                              : false
                          }
                          rows={10}
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.trimStart())
                          }
                          placeholder="Background Study of Existing System"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                {/* Methodology/Approach */}
                <FormField
                  controller={form.control}
                  name="methodologyAndApproach"
                  render={({ field }) => (
                    <FormItem>
                      <Tooltip>
                        <TooltipTrigger>
                          <FormLabel className="flex justify-start items-center gap-2">
                            Methodology/Approach
                            <BsFillInfoCircleFill />
                          </FormLabel>
                        </TooltipTrigger>
                        <TooltipContent className="w-screen sm:w-auto">
                          <div>
                            <b>Methodology:</b> The methodology section outlines
                            the systematic procedures/method/
                            workflow/flowchart/architecture and techniques that
                            will be used to conduct the project.{" "}
                            <br className="hidden sm:block" /> This section also
                            describes the practical steps and strategies that
                            will be implemented to achieve the project's goals.
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      <FormControl>
                        <Textarea
                          disabled={
                            inGroup
                              ? isValidDate || isLocked || !isLeader
                              : false
                          }
                          rows={10}
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.trimStart())
                          }
                          placeholder="Methodology/Approach"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                {/* Tentative Project Plan/Timeline */}
                <FormField
                  controller={form.control}
                  name="tentativeProjectPlan"
                  render={({ field }) => (
                    <FormItem>
                      <Tooltip>
                        <TooltipTrigger>
                          <FormLabel className="flex justify-start items-center gap-2">
                            Tentative Project Plan/Timeline
                            <BsFillInfoCircleFill />
                          </FormLabel>
                        </TooltipTrigger>
                        <TooltipContent className="w-screen sm:w-auto">
                          <div>
                            The project timeline provides the project schedule,
                            highlighting key milestones, deadlines and the
                            duration of each phase.
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      <FormControl>
                        <Textarea
                          disabled={
                            inGroup
                              ? isValidDate || isLocked || !isLeader
                              : false
                          }
                          rows={10}
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.trimStart())
                          }
                          placeholder="Tentative Project Plan/Timeline"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                {/* Individual Role */}
                <FormField
                  controller={form.control}
                  name="individualRole"
                  render={({ field }) => (
                    <FormItem>
                      <Tooltip>
                        <TooltipTrigger>
                          <FormLabel className="flex justify-start items-center gap-2">
                            Individual Role
                            <BsFillInfoCircleFill />
                          </FormLabel>
                        </TooltipTrigger>
                        <TooltipContent className="w-screen sm:w-auto">
                          <div>
                            Define the role and responsibilities of each team
                            member in your project group.
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      <FormControl>
                        <Textarea
                          disabled={
                            inGroup
                              ? isValidDate || isLocked || !isLeader
                              : false
                          }
                          rows={10}
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.trimStart())
                          }
                          placeholder="Individual Role"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                {/* Innovation/Novelty */}
                <FormField
                  controller={form.control}
                  name="innovation"
                  render={({ field }) => (
                    <FormItem>
                      <Tooltip>
                        <TooltipTrigger>
                          <FormLabel className="flex justify-start items-center gap-2">
                            Innovation/Novelty
                            <BsFillInfoCircleFill />
                          </FormLabel>
                        </TooltipTrigger>
                        <TooltipContent className="w-screen sm:w-auto">
                          <div>
                            <b>Innovation:</b> The innovation aspect of the
                            project refers to the novel features, methodologies,{" "}
                            <br className="hidden sm:block" /> or technologies
                            introduced to address the problem in a new and
                            effective way.
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      <FormControl>
                        <Textarea
                          disabled={
                            inGroup
                              ? isValidDate || isLocked || !isLeader
                              : false
                          }
                          rows={10}
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.trimStart())
                          }
                          placeholder="Innovation/Novelty"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                {/* Expected Outcome */}
                <FormField
                  controller={form.control}
                  name="expectedOutcome"
                  render={({ field }) => (
                    <FormItem>
                      <Tooltip>
                        <TooltipTrigger>
                          <FormLabel className="flex justify-start items-center gap-2">
                            Expected Outcome
                            <BsFillInfoCircleFill />
                          </FormLabel>
                        </TooltipTrigger>
                        <TooltipContent className="w-screen sm:w-auto">
                          <div>
                            <b>Expected Outcome:</b> A clear, measurable result
                            or deliverable that aligns with project goals.
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      <FormControl>
                        <Textarea
                          disabled={
                            inGroup
                              ? isValidDate || isLocked || !isLeader
                              : false
                          }
                          rows={10}
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.trimStart())
                          }
                          placeholder="Expected Outcome"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 items-end">
                  {/* Type of Project */}
                  <FormField
                    controller={form.control}
                    name="typeOfProject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-start items-center gap-2">
                          Type of Project
                        </FormLabel>
                        <FormControl>
                          <Select
                            disabled={
                              inGroup
                                ? isValidDate || isLocked || !isLeader
                                : false
                            }
                            onValueChange={field.onChange}
                            {...field}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type of project" />
                              <SelectContent>
                                <SelectItem value="Application">
                                  Application
                                </SelectItem>
                                <SelectItem value="Research Oriented/Applied research">
                                  Research Oriented/Applied Research
                                </SelectItem>
                              </SelectContent>
                            </SelectTrigger>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Type of Application */}
                  <FormField
                    controller={form.control}
                    name="typeOfApplication"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-start items-center gap-2">
                          Type of Application
                        </FormLabel>
                        <FormControl>
                          <Select
                            disabled={
                              inGroup
                                ? isValidDate || isLocked || !isLeader
                                : false
                            }
                            onValueChange={field.onChange}
                            {...field}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type of application" />
                              <SelectContent>
                                <SelectItem value="Website/web-application">
                                  Website/Web-Application
                                </SelectItem>
                                <SelectItem value="Mobile Application">
                                  Mobile application
                                </SelectItem>
                                <SelectItem value="Desktop Application">
                                  Desktop application
                                </SelectItem>
                              </SelectContent>
                            </SelectTrigger>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Domain */}
                  <FormField
                    controller={form.control}
                    name="domain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-start items-center gap-2">
                          Domain
                        </FormLabel>
                        <FormControl>
                          <Select
                            disabled={
                              inGroup
                                ? isValidDate || isLocked || !isLeader
                                : false
                            }
                            onValueChange={(value) => {
                              field.onChange(value);
                              if (value == "Other" && otherField.field == false)
                                return setOtherField({
                                  field: true,
                                  value: "",
                                });
                              if (value !== "Other" && otherField.field)
                                setOtherField({ field: false, value: "" });
                            }}
                            {...field}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select domain" />
                              <SelectContent>
                                {domain.map((item, index) => (
                                  <SelectItem key={index} value={item}>
                                    {item}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </SelectTrigger>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* other domain */}
                  {otherField.field && (
                    <FormField
                      controller={form.control}
                      name="domain"
                      render={({ field }) => (
                        <FormItem>
                          <Tooltip>
                            <TooltipTrigger>
                              <FormLabel className="flex justify-start items-center gap-2">
                                Other Domain
                              </FormLabel>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div>Enter your specific domain here.</div>
                            </TooltipContent>
                          </Tooltip>
                          <FormControl>
                            <Input
                              disabled={
                                inGroup
                                  ? inGroup
                                    ? isValidDate || isLocked || !isLeader
                                    : false
                                  : false
                              }
                              value={otherField.value}
                              onChange={(e) =>
                                setOtherField({
                                  field: true,
                                  value: e.target.value,
                                })
                              }
                              placeholder="Other"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    ></FormField>
                  )}
                </div>

                {/* Technology & Tools */}
                <FormField
                  controller={form.control}
                  name="technologyAndTools"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-start items-center gap-2">
                        Technology & Tools
                      </FormLabel>
                      <FormControl>
                        <TagInput
                          disabled={
                            inGroup
                              ? isValidDate || isLocked || !isLeader
                              : false
                          }
                          {...form}
                          {...field}
                          placeholder="Technology and tools"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Languages */}
                <FormField
                  controller={form.control}
                  name="languages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-start items-center gap-2">
                        Languages
                      </FormLabel>
                      <FormControl>
                        <TagInput
                          disabled={
                            inGroup
                              ? isValidDate || isLocked || !isLeader
                              : false
                          }
                          {...form}
                          {...field}
                          placeholder="Languages"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              {(inGroup ? !isLocked && isLeader && !isValidDate : true) && (
                <CardFooter className="border-t px-6 py-4 flex flex-col items-start gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      disabled={projectDetails.data !== undefined}
                      checked={leaderConfirmation}
                      onCheckedChange={(e) => {
                        setLeaderConfirmation(e);
                      }}
                      id="leader"
                    />
                    <label
                      htmlFor="leader"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Yes, I am the group leader of this project.
                    </label>
                  </div>
                  <Button
                    disabled={
                      !leaderConfirmation ||
                      updateProjectDetails.isPending ||
                      saveProjectDetails.isPending
                    }
                    type="submit"
                  >
                    {(updateProjectDetails.isPending ||
                      saveProjectDetails.isPending) && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save
                  </Button>
                </CardFooter>
              )}
            </form>
          </Form>
        </Card>
      </div>
      <Dialog open={deleteGroupDialog} onOpenChange={setDeleteGroupDialog}>
        <DialogContent>
          <DialogTitle>Delete Group</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the group?
          </DialogDescription>
          <div className="flex justify-end gap-5">
            <Button variant="ghost" onClick={() => setDeleteGroupDialog(false)}>
              Cancel
            </Button>
            <Button
              isLoading={deleteGroup.isPending}
              disabled={deleteGroup.isPending}
              onClick={deleteGroupData}
              variant="destructive"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
