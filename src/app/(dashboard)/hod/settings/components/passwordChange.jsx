"use client";
import toast from "react-hot-toast";

import { Warper } from "./warper";
import { useChangePassword } from "../services/mutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { changePasswordValidator } from "@/validator/auth.validator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function PasswordChange() {
  const changePassword = useChangePassword();

  const form = useForm({
    resolver: zodResolver(changePasswordValidator),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (value) => {
    console.log(value);
    changePassword.mutate(
      {
        currentPassword: value.currentPassword,
        newPassword: value.newPassword,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            form.reset();
            return toast.success(data.message);
          }
        },
        onError: (error) => {
          return toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "Having some issue please try again later"
          );
        },
      }
    );
  };

  return (
    <Warper
      title="Personal Information"
      description="You can update your personal information from here."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              isLoading={changePassword.isPending}
              disabled={changePassword.isPending}
              type="submit"
            >
              change
            </Button>
          </div>
        </form>
      </Form>
    </Warper>
  );
}
