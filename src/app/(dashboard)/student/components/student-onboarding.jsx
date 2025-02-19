"use client";
import Image from "next/image";
import { useState } from "react";
import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { useOnboarding } from "../hook/useOnboarding";

export default function StudentOnBoding() {
  const [slides, setSlides] = useState(1);
  const { updateOnboarding, onboardingStatus, isLoading } = useOnboarding();
  const maxSlides = 10;

  const updateSlides = async (index) => {
    if (index === maxSlides + 1) {
      if (onboardingStatus === 3) {
        await updateOnboarding(3);
        return setSlides(1);
      }
      await updateOnboarding(1);
      return setSlides(1);
    }
    if (index === 0) return;
    setSlides(index);
  };

  return (
    <DialogContent hideClose className="onboarding-dialog p-4">
      <Slides
        box={
          <div className="h-[200px] w-full bg-primary flex items-center justify-center flex-col gap-1 select-none">
            <div className="text-white text-4xl">Welcome to</div>
            <div className="text-white text-4xl font-bold">SGPMS</div>
          </div>
        }
        active={slides === 1}
        text={
          <div>
            Welcome to <b>Software Group Project Management System</b> 🎉 <br />
          </div>
        }
      />
      <Slides
        box={
          <Image
            src="/onboarding/student/1.png"
            width={2000}
            height={1107}
            alt="onboarding"
          />
        }
        active={slides === 2}
        text={
          <div>
            Use the sidebar to navigate the SGPMS. Click on Group Profile,
            Submission, or Settings. <br />
            <br /> Group Profile expands to show Project Information, Group
            Members, and Lock Group options.
          </div>
        }
      />
      <Slides
        box={
          <Image
            src="/onboarding/student/2.png"
            width={1000}
            height={1107}
            alt="onboarding"
          />
        }
        active={slides === 3}
        text={
          <div className="space-y-2">
            <div className="underline flex justify-start items-center gap-2">
              <Link size={18} /> <span>Group Profile/Project Information</span>
            </div>
            <div>
              Only the <b>Team Leader is allowed to fill out this form</b> to
              register the project group.{" "}
              <b>Other team members cannot fill this form to join the group.</b>
            </div>
          </div>
        }
      />
      <Slides
        box={
          <Image
            src="/onboarding/student/4.png"
            width={1000}
            height={1107}
            alt="onboarding"
          />
        }
        active={slides === 4}
        text={
          <div className="space-y-2">
            <div className="underline flex justify-start items-center gap-2">
              <Link size={18} /> <span>Group Profile/Group Members</span>
            </div>
            <div>
              The Team Leader will add their team members to the group from
              Group Members Screen.
              <br />
              <div className="font-bold">
                Note: Other team members must sign up first but should not fill
                out the project information form to be invited to the group.
              </div>
            </div>
          </div>
        }
      />
      <Slides
        box={
          <Image
            src="/onboarding/student/5.png"
            width={1000}
            height={1107}
            alt="onboarding"
          />
        }
        active={slides === 5}
        text={
          <div className="space-y-2">
            Enter your team members' email addresses to invite them to the
            group.
            <br />
            <div className="font-bold">
              Note: Other team members must sign up first but should not fill
              out the project information form to be invited to the team.
            </div>
          </div>
        }
      />
      <Slides
        box={
          <Image
            src="/onboarding/student/6.png"
            width={1000}
            height={1107}
            alt="onboarding"
          />
        }
        active={slides === 6}
        text={
          <div className="space-y-2">
            <div className="underline flex justify-start items-center gap-2">
              <Link size={18} /> <span>Group Profile/Lock Group</span>
            </div>
            <div>
              After adding all the team members, and filling out the project
              information, the Team Leader can look to lock the group and submit
              the project.
            </div>
            <div className="font-bold">
              After locking the group, the Team Leader cannot change the project
              information or group members.
            </div>
          </div>
        }
      />
      <Slides
        box={
          <Image
            src="/onboarding/student/7.png"
            width={1000}
            height={1107}
            alt="onboarding"
          />
        }
        active={slides === 7}
        text={
          <div className="space-y-2">
            <div>
              Congratulation 🎉, you have successfully register your project.
            </div>
            <div>
              Now you can submit your weekly report from Submission tab.
            </div>
            <div>
              In weekly report first team leader need to enter it's weekly
              expected work of there project and what work has been done then
              click on save.
            </div>
          </div>
        }
      />

      <Slides
        box={
          <Image
            src="/onboarding/student/8.png"
            width={1000}
            height={1107}
            alt="onboarding"
          />
        }
        active={slides === 8}
        text={
          <div className="space-y-2">
            <div>
              In Your work tab individual team member need to enter there weekly
              work and click on save.
            </div>
            <div>
              After all team member submit there work team leader can submit the
              weekly report by clicking on lock button.
            </div>
            <div className="font-bold">
              After lock weekly report can't be edited.
            </div>
          </div>
        }
      />
      <Slides
        box={
          <Image
            src="/onboarding/student/9.png"
            width={1000}
            height={1107}
            alt="onboarding"
          />
        }
        active={slides === 9}
        text={
          <div className="space-y-2">
            <div>
              In Setting screen you can change your password and logout from the
              System.
            </div>
            <div className="font-bold">
              To change your Personal information please contact your project
              coordinator.
            </div>
          </div>
        }
      />
      <Slides
        box={
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/6vXTuDnJ9cw?si=oxM5eH3FwY7yhWNd"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        }
        active={slides === 10}
        text={
          <div>Please watch the video for more detailed understanding.</div>
        }
      />

      <div className="w-full flex justify-end space-x-3">
        {slides > 1 && slides <= maxSlides && (
          <Button
            onClick={() => updateSlides(slides - 1)}
            className="max-w-min px-10"
            variant="ghost"
          >
            Back
          </Button>
        )}
        <Button
          onClick={() => updateSlides(slides + 1)}
          className="max-w-min px-10"
          variant="secondary"
        >
          {slides === maxSlides ? "Finish" : "Next"}
        </Button>
      </div>
    </DialogContent>
  );
}

function Slides({ box, text, active }) {
  if (!active) return null;
  if (active)
    return (
      <div className="space-y-4">
        <div className="w-full rounded-lg bg-primary overflow-hidden border h-[218px] sm:h-[290px] flex justify-center items-center">
          {box}
        </div>
        {text}
      </div>
    );
}
