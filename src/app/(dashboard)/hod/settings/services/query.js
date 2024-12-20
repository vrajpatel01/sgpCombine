import { useQuery } from "@tanstack/react-query";
import { getMyInformation } from "./api";

export const useMyInformation = () => {
    return useQuery({
        queryKey: ['myInfo'],
        queryFn: () => getMyInformation(),
    })
}