import { useQuery } from "@tanstack/react-query"
import { getOnboardingStatus } from "./api"

export function useGetOnboardingStatus  () {
    return useQuery({
        queryKey: ['onboarding'],
        queryFn: getOnboardingStatus
    })
}