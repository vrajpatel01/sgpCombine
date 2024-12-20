import { useQuery } from "@tanstack/react-query"
import { me } from "./api"

export const useMe = () => {
    return useQuery({
        queryFn: () => me(),
        queryKey: ['me'],
    })
}