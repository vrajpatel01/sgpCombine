import axiosInstance from "@/axios.config"
import { getSession } from "next-auth/react"

export const search = async ({ search, searchBy, role }) => {
    const session = await getSession();
    let url = `/hod/search-users?role=${role}`
    if (searchBy === "id") {
        url = `/hod/search-users?role=${role}&id=${search}`
    }
    if (searchBy === "email") {
        url = `/hod/search-users?role=${role}&email=${search}`
    }
    if (searchBy === "name") {
        url = `/hod/search-users?role=${role}&name=${search}`
    }
    return (await axiosInstance.get(url, {
        headers: {
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}