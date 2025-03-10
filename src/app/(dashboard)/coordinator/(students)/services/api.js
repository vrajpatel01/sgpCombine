import axiosInstance from "@/axios.config";
import { getSession } from "next-auth/react";

export const addStudents = async (data) => {
    const session = await getSession()
    return (await axiosInstance.post('/coordinator/add-student', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.token}`
        }
    })).data
}

export const getStudents = async () => {
    const session = await getSession()
    return (await axiosInstance.get('/coordinator/all-students', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.token}`
        }
    })).data
}

export const getOneStudent = async (studentId) => {
    const session = await getSession()
    return (await axiosInstance.get(`/coordinator/student/${studentId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.token}`
        }
    })).data
}

// need to change the endpoint
export const getStudentsWithPagination = async (page, row) => {
    const session = await getSession()
    return (await axiosInstance.get(`/admin/students-page/${page}/${row}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.token}`
        }
    })).data
}


export const deleteStudentAccount = async (id) => {
    const session = await getSession()
    return (await axiosInstance.delete(`/coordinator/delete-student/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}

export const deleteMultipleStudentsAccount = async (ids) => {
    const session = await getSession()
    return (await axiosInstance.delete('/coordinator/delete-students', {
        data: {
            ids
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}

export const editStudentAccount = async (data) => {
    const session = await getSession()

    return (await axiosInstance.patch(`/coordinator/edit-student/${data.id}`, data.payload, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}

export const getMyStudents = async () => {
    const session = await getSession();
    return (await axiosInstance.get("/faculty/students", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}

export const getStudentWithoutGroup = async () => {
    const session = await getSession();
    return (await axiosInstance.get("/coordinator/students-without-group", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}