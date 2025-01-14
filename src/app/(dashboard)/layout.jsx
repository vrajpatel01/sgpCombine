import { StudentOnboardingProvider } from "./student/hook/useOnboarding";

export default function MainLayout({ children }) {
  return (
    <div>
      <StudentOnboardingProvider>{children}</StudentOnboardingProvider>
    </div>
  );
}
