import { useQuery } from "@tanstack/react-query"
import { search } from "./api"

export const useSearchUser = (data) => {
    return useQuery({
        queryFn: () => search(data),
        queryKey: ['search', data.name, data.email, data.role],
    })
}