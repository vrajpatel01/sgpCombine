import { useQuery } from "@tanstack/react-query";
import { getOneStudent, getStudents, getStudentsWithPagination } from "./api";

export const useGetStudents = () => {
    return useQuery({
        queryKey: ['students'],
        queryFn: () => getStudents(),
    })
}

export const useGetStudentWithPagination = (page, row) => {
    return useQuery({
        queryKey: ['students', page],
        queryFn: () => getStudentsWithPagination(page, row),
    })
}

export const useGetOneStudent = (studentId) => {
    return useQuery({
        queryKey: ['student', studentId],
        queryFn: () => getOneStudent(studentId),
    })
}