import { queryOptions, useQuery } from "@tanstack/react-query";
import { generateCertificate, generateCoverPage, getGroupMembers, getGroupSelectionDates, getProjectDetails } from "./api";

export const useGetProjectDetails = () => {
    return useQuery({
        queryKey: ["project-details"],
        queryFn: () => getProjectDetails(),
        ...queryOptions
    })
}

export const useGetGroupMembers = () => {
    return useQuery({
        queryKey: ["group-members"],
        queryFn: () => getGroupMembers(),
        ...queryOptions
    })
}

export const useGetGroupSelectionDate = () => {
    return useQuery({
        queryKey: ["group-selection-date"],
        queryFn: () => getGroupSelectionDates(),
        ...queryOptions
    })
}

export const useGenerateCertificate = () => {
    return useQuery({
        queryKey: ['certificate'],
        queryFn: () => generateCertificate(),
        enabled: false,
        ...queryOptions
    })
}

export const useGenerateCoverPage = () => {
    return useQuery({
        queryKey: ['cover-page'],
        queryFn: () => generateCoverPage(),
        enabled: false,
        ...queryOptions
    })
}