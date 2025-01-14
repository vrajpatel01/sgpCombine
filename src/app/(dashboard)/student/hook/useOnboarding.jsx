"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useGetOnboardingStatus } from "../services/query";
import { useUpdateOnboardingStatus } from "../services/mutation";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const onboardingContext = createContext();

export const StudentOnboardingProvider = ({ children }) => {
  const toast = useToast();
  const [onboarding, setOnboarding] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [getRole, setRole] = useState(false);
  const onboardingStatus = useGetOnboardingStatus();
  const updateOnboardingStatus = useUpdateOnboardingStatus();
  const queryClient = useQueryClient();

  const updateOnboarding = async (status) => {
    if (status === 0) {
      return update(status, () => {
        setRole(false);
        setIsMember(false);
        return setOnboarding(true);
      });
    }

    // if (status === 1 && onboardingStatus.data.onboarding === 3) {
    //   setOnboarding(false);
    //   setRole(false);
    //   return setIsMember(false);
    // }

    if (status === 1) {
      return update(status, () => {
        setOnboarding(false);
        setIsMember(false);
        return setRole(true);
      });
    }

    if (status === 2) {
      return update(status, () => {
        setRole(false);
        setOnboarding(false);
        return setIsMember(true);
      });
    }

    if (status === 3) {
      return update(status, () => {
        setOnboarding(false);
        setRole(false);
        return setIsMember(false);
      });
    }

    if (status === 4) {
      setRole(false);
      setIsMember(false);
      return setOnboarding(true);
    }
  };

  useEffect(() => {
    if (onboardingStatus.isSuccess) {
      // setOnboarding(onboardingStatus.data.onboarding == 0);
      updateOnboarding(onboardingStatus.data.onboarding);
    }
  }, [onboardingStatus.isSuccess]);

  const update = (status, cb) => {
    return updateOnboardingStatus.mutate(status, {
      onSuccess: (data) => {
        queryClient.invalidateQueries("onboarding");
        if (data.success) cb();
      },
      onError: (error) => {
        const message =
          error?.response?.data?.message || "Something went wrong";
        toast({
          title: "Error",
          description: message,
        });
      },
    });
  };

  return (
    <onboardingContext.Provider
      value={{
        onboarding,
        isMember,
        getRole,
        updateOnboarding,
        onboardingStatus: onboardingStatus.data?.onboarding,
        isLoading: updateOnboardingStatus.isPending,
      }}
    >
      {children}
    </onboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(onboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
};
