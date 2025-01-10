import { useMutation } from "@tanstack/react-query";
import { updateOnboardingStatus } from "./api";

export function useUpdateOnboardingStatus() {
    return useMutation({
        mutationFn: updateOnboardingStatus,
        mutationKey: ['onboarding']
    })
}