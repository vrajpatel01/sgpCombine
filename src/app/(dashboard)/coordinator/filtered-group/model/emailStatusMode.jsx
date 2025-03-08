import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useSendReminderToGroupsWhoNotSubmittedWeeklyReport } from "../services/mutation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import TableRow from "@/components/shared/table/tableRow";
import TableCell from "@/components/shared/table/tableCell";
import Skeleton from "react-loading-skeleton";

export const EmailStatusModel = ({ setModel }) => {
  const [stage, setStage] = useState(1);
  const sendReminder = useSendReminderToGroupsWhoNotSubmittedWeeklyReport();

  const onReminderSend = () => {
    sendReminder.mutate(() => {}, {
      onSuccess: () => {
        setStage(3);
      },
    });
  };

  const handleDoneClick = () => {
    setModel(false);
    setStage(1);
  };

  useEffect(() => {
    const isLoading = sendReminder.isPending;
    if (isLoading) {
      setStage(2);
    } else if (sendReminder.isSuccess && !isLoading) {
      setStage(3);
    }
  }, [sendReminder.isPending]);

  return (
    // <DialogContent className="max-h-[600px] overflow-y-scroll">
    <DialogContent>
      <DialogHeader>Send Reminder</DialogHeader>
      {stage == 1 && (
        <>
          <DialogDescription>
            You are about to send a reminder to all groups who have not
            submitted current week weekly report yet. Are you sure you want to
            proceed?
          </DialogDescription>
          <DialogFooter>
            <Button onClick={onReminderSend} disabled={sendReminder.isPending}>
              {sendReminder.isPending && <Loader2 className="animate-spin" />}
              Send
            </Button>
          </DialogFooter>
        </>
      )}
      {stage == 2 && (
        <div className="flex items-center gap-3 justify-center py-10">
          <Loader2 className="animate-spin" /> Sending...
        </div>
      )}
      {stage == 3 && (
        <div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted rounded-md p-3 text-lg text-center">
              <div>Success</div>
              <div className="font-semibold">
                {sendReminder?.data?.emailsSent ?? 0}
              </div>
            </div>
            <div className="bg-muted rounded-md p-3 text-lg text-center">
              <div>Failed</div>
              <div className="font-semibold">
                {sendReminder?.data?.emailsFailed ?? 0}
              </div>
            </div>
          </div>
          <div className="max-h-[400px] overflow-y-scroll mt-5">
            <table className="w-full table-auto">
              <thead className="border-b-1 border-border">
                <TableRow header>
                  {/* {students.isSuccess && <TableCell content="" />} */}
                  <TableCell content="Group Id" />
                  <TableCell content="Leader Name" />
                  <TableCell content="Leader Email" />
                </TableRow>
              </thead>
              <tbody className="divide-y">
                {sendReminder.isPending &&
                  Array(15)
                    .fill(0)
                    .map((_, index) => (
                      <TableRow key={index}>
                        <TableCell
                          content={<Skeleton height={30} width={300} />}
                        />
                        <TableCell
                          content={<Skeleton height={30} width={300} />}
                        />
                        <TableCell
                          content={<Skeleton height={30} width={300} />}
                        />
                      </TableRow>
                    ))}
                {sendReminder.isSuccess &&
                  sendReminder?.data?.groups?.map((student, index) => (
                    <TableRow id={student._id} key={index}>
                      <TableCell content={student.groupId} />
                      <TableCell content={student.students[0].name} />
                      <TableCell content={student.students[0].email} />
                    </TableRow>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-5">
            <Button onClick={handleDoneClick}>Done</Button>
          </div>
        </div>
      )}
    </DialogContent>
  );
};
