import axiosInstance from "@/axios.config";
import { getSession } from "next-auth/react";

export const addFaulty = async (data) => {
    const session = await getSession()
    return (await axiosInstance.post('/coordinator/add-faculty', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}

export const getAllFaculty = async () => {
    const session = await getSession()
    return (await axiosInstance.get('/coordinator/all-faculties', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}

export const getFaculty = async (facultyId) => {
    const session = await getSession()
    return (await axiosInstance.get(`/coordinator/faculty/${facultyId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}

export const getAllFacultyWithPagination = async (page, row) => {
    const session = await getSession()
    return (await axiosInstance.get(`/admin/faculties-page/${page}/${row}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}


export const deleteFacultyAccount = async (id) => {
    const session = await getSession()
    return (await axiosInstance.delete(`/coordinator/delete-faculty/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}

export const deleteMultipleFacultiesAccount = async (ids) => {
    const session = await getSession()
    return (await axiosInstance.delete('/coordinator/delete-faculties', {
        data: {
            ids
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}

export const editFacultyAccount = async (data) => {
    const session = await getSession()

    return (await axiosInstance.patch(`/coordinator/edit-faculty/${data.id}`, data.payload, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}

export const createAccountWithCSV = async (data) => {
    const session = await getSession();
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('role', data.role);
    formData.append('department', data.department);
    formData.append('institute', data.institute);

    return (await axiosInstance.post(`/coordinator/upload-csv`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data;
}

export const assignCoordinator = async (data) => {
    const session = await getSession()

    return (await axiosInstance.patch(`/coordinator/assign-coordinator/${data.id}`, {
        semesters: data.semester
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}