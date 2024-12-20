import { useQuery } from "@tanstack/react-query";
import { getAllFaculty, getAllFacultyWithPagination, getFaculty } from "./api";

export const useGetFaulty = () => {
    return useQuery({
        queryKey: ['faculty'],
        queryFn: () => getAllFaculty(),
    })
}

export const useGetFaultyWithPagination = (page, row) => {
    return useQuery({
        queryKey: ['faculty', page],
        queryFn: () => getAllFacultyWithPagination(page, row),
    })
}

export const useGetFaculty = (facultyId) => {
    return useQuery({
        queryKey: ['faculty', facultyId],
        queryFn: () => getFaculty(facultyId),
    })
}