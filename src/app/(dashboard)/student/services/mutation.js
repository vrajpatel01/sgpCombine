import { useMutation } from "@tanstack/react-query";
import { updateOnboardingStatus } from "./api";

export function useUpdateOnboardingStatus() {
    return useMutation({
        mutationFn: (status) => updateOnboardingStatus(status),
        mutationKey: ['onboarding']
    })
}