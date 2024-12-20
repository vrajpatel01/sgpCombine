"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryChart, ProjectSubmissionChart, TechnologyChart } from "./components/charts";
import { useGetCategoryInfo, useGetProjectSubmissionInfo, useGetTechnologyInfo } from "./services/query";
import Skeleton from "react-loading-skeleton";

export default function DashboardPage() {
    const institutes = useGetProjectSubmissionInfo()

    const projectSubmission = useGetProjectSubmissionInfo()

    const technologyChart = useGetTechnologyInfo()

    const categoryChart = useGetCategoryInfo()

    if (institutes.isLoading) {
        return (
            <div className="space-y-10">
                <h1 className="text-title-28 mb-5">Dashboard</h1>
                <Skeleton height={300} className="mb-6" />
                <Skeleton height={300} />
            </div>
        )
    }
    return (
        <div className="h-full">
            <h1 className="text-title-28 mb-5">Dashboard</h1>
            <div className="space-y-5">
                <ProjectSubmissionChart data={projectSubmission} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <TechnologyChart data={technologyChart} />
                    <CategoryChart data={categoryChart} />
                </div>
            </div>
        </div>
    )
}
