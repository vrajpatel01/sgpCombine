import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useOnboarding } from "../hook/useOnboarding";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export default function GetRole() {
  const { updateOnboarding, isLoading } = useOnboarding();
  const validator = z.object({
    input: z
      .string()
      .refine((value) => value === "I'm Leader" || value === "I'm Member", {
        message: "Invalid input",
      }),
  });

  const onSubmit = (value) => {
    if (value.input === "I'm Leader") {
      console.log("I am leader");
      updateOnboarding(3);
      return;
    } else if (value.input === "I'm Member") {
      console.log("I am member");
      updateOnboarding(2);
      return;
    }
  };

  const form = useForm({
    resolver: zodResolver(validator),
    defaultValues: {
      input: "",
    },
  });

  return (
    <DialogContent hideClose className="getRole-dialog">
      <DialogTitle>Who are you?</DialogTitle>
      <DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <span>
              If you are the leader of your project group, please type{" "}
              <b>I'm Leader</b> otherwise, type <b>I'm Member</b> in this text
              box.
            </span>
            <FormField
              name="input"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button isLoading={isLoading} disabled={isLoading}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogDescription>
    </DialogContent>
  );
}
