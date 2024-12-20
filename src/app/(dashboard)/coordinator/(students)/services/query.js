import { useQuery } from "@tanstack/react-query";
import { getMyStudents, getOneStudent, getStudents, getStudentsWithPagination } from "./api";

export const useGetStudents = () => {
    return useQuery({
        queryKey: ['all-students'],
        queryFn: () => getStudents(),
        enabled: false,
    })
}

export const useGetStudentWithPagination = (page, row) => {
    return useQuery({
        queryKey: ['all-students', page],
        queryFn: () => getStudentsWithPagination(page, row),
        enabled: false,
    })
}

export const useGetOneStudent = (studentId) => {
    return useQuery({
        queryKey: ['student', studentId],
        queryFn: () => getOneStudent(studentId),
        enabled: false,
    })
}

export const useGetMyStudents = () => {
    return useQuery({
        queryFn: getMyStudents,
        queryKey: ["my-students"],
    })
}