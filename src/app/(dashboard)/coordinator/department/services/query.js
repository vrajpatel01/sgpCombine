import { useQuery } from "@tanstack/react-query";
import { getGroupLimit, getGroupSelectionDate, getSemesterDate } from "./api";

export const useGetSemesterDates = () => {
    return useQuery({
        queryKey: ['semesterDates'],
        queryFn: () => getSemesterDate(),
    })
}

export const useGetGroupSelectionDates = () => {
    return useQuery({
        queryKey: ['groupSelectionDates'],
        queryFn: () => getGroupSelectionDate(),
    })
}

export const useGetGroupLimit = () => {
    return useQuery({
        queryKey: ['groupLimit'],
        queryFn: () => getGroupLimit(),
    })
}