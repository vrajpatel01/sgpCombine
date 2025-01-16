"use client";
import { Dialog } from "@/components/ui/dialog";
import { useOnboarding } from "../hook/useOnboarding";
import StudentOnBoding from "./student-onboarding";
import GetRole from "./getRole";
import MemberOnboarding from "./member-onboarding";

export default function OnboardingDialog() {
  const { onboarding, getRole, isMember } = useOnboarding();
  return (
    <>
      <Dialog open={onboarding}>
        <StudentOnBoding />
      </Dialog>
      <Dialog open={getRole}>
        <GetRole />
      </Dialog>
      <Dialog open={isMember}>
        <MemberOnboarding />
      </Dialog>
    </>
  );
}
