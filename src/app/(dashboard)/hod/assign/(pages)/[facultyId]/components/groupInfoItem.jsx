"use client";
import { useState } from "react";

import { IoLockClosed, IoLockOpen } from "react-icons/io5";
import { CircleMinus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeassignGroup } from "../../../services/mutation";
import { cn } from "@/lib/utils";

export default function GroupInfoItem({
  group,
  className,
  onClick,
  checkBox,
  deassignBtn,
  onCheckBoxChange = () => {},
  link = "",
}) {
  const router = useRouter();
  const [select, setSelect] = useState(false);
  const [deassignModel, setDeasignModel] = useState(false);
  const deassignFn = useDeassignGroup();
  return (
    <>
      <div
        passHref
        onClick={(e) => {
          e.stopPropagation();
          router.push(link);
        }}
        href={link}
      >
        <div
          onClick={(e) => {
            if (checkBox) {
              setSelect(!select);
              onClick(e, select);
            }
          }}
          className={`p-5 rounded-md shadow-sm flex justify-start items-start flex-col gap-1 cursor-pointer overflow-hidden ${
            select ? "bg-secondary-background border-primary" : "bg-white"
          } ${className}`}
        >
          <div className="flex justify-start items-center gap-4 w-full">
            {checkBox && (
              <input
                checked={select}
                onChange={(e) => {
                  setSelect(e.target.checked);
                  onCheckBoxChange(e);
                }}
                hidden
                type="checkbox"
                className="accent-primary cursor-pointer w-5 h-5"
              />
            )}
            <div className="flex justify-between items-center w-full">
              <span title="group id" className="text-body-18 font-medium">
                {group?.groupId}
              </span>
              <span
                title="group id"
                className="text-body-18 font-medium p-2 rounded-md bg-secondary-background"
              >
                <div>{group?.isLocked ? <IoLockClosed /> : <IoLockOpen />}</div>
              </span>
            </div>
          </div>
          <div className="flex justify-start items-start gap-3">
            <div className="text-body-16 text-light-text">Title</div>
            <div title="leader name" className="text-body-16 capitalize">
              {group?.title}
            </div>
          </div>
          <div className="flex justify-between items-center w-full gap-3">
            <div
              className={cn("flex justify-start items-center gap-3 w-full", {
                "w-1/2": deassignBtn,
              })}
            >
              <div className="text-body-16 text-light-text">Leader</div>
              <div
                title="leader name"
                className="text-body-16 capitalize whitespace-nowrap truncate"
              >
                {group?.leader}
              </div>
            </div>
            {deassignBtn && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setDeasignModel(true);
                }}
                className="flex justify-center items-center gap-2 text-sm bg-muted/60 hover:bg-muted px-3 py-2 rounded-full select-none"
              >
                <CircleMinus size={16} />
                <span>Deassign</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Dialog open={deassignModel} onOpenChange={setDeasignModel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deassign</DialogTitle>
            <DialogDescription>
              Are you sure you want to deassign this group from the assigned
              faculty? Do you wish to proceed?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              disabled={deassignFn?.isPending}
              isLoading={deassignFn?.isPending}
              onClick={() => {
                deassignFn.mutate(group._id, {
                  onSuccess: (data) => {
                    if (data) {
                      setDeasignModel(false);
                    }
                  },
                });
              }}
            >
              <span>continue</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
