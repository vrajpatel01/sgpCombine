import axiosInstance from "@/axios.config"
import { getSession } from "next-auth/react"

export const search = async ({ role, name, email }) => {
    const session = await getSession();
    let url = `/hod/search-users?role=${role}`
    if (name) {
        url = `/hod/search-users?role=${role}&name=${name}`
    }

    if (email) {
        url = `/hod/search-users?role=${role}&email=${email}`
    }

    if (name && email) {
        url = `/hod/search-users?role=${role}&name=${name}&email=${email}`
    }
    return (await axiosInstance.get(url, {
        headers: {
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}