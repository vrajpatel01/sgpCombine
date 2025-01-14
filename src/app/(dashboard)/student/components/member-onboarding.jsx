import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOnboarding } from "../hook/useOnboarding";

export default function MemberOnboarding() {
  const { updateOnboarding } = useOnboarding();
  return (
    <DialogContent hideClose>
      <DialogTitle>Information</DialogTitle>
      <DialogDescription>
        Please contact your group leader to join the group. If you are the group
        leader, click the <b>I'm Leader</b> button below to proceed. Otherwise,
        reach out to your group leader for join the group.
      </DialogDescription>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            updateOnboarding(3);
          }}
        >
          I'm Leader
        </Button>
      </div>
    </DialogContent>
  );
}
