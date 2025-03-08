import { useAddStudent } from "../services/mutation";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import addStudentValidator from "@/validator/addStudent.validator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function AddStudentModel({ data, setData }) {
  const addStudent = useAddStudent();

  const form = useForm({
    resolver: zodResolver(addStudentValidator),
    defaultValues: {
      name: "",
      rollNumber: "",
      email: "",
      phoneNumber: "",
      division: "",
      batch: "",
    },
  });

  const onSubmit = (value) => {
    const data = {
      email: value.email,
      phoneNumber: value.phoneNumber,
      division: value.division,
      semester: 6, // this line needs to remove in future
      name: value.name,
      rollNumber: value.rollNumber,
      batch: value.batch,
    };

    addStudent.mutate(data, {
      onSuccess: (data) => {
        if (data.success) {
          setData(false);
          return form.reset();
        }
      },
    });
  };
  return (
    <SheetContent className="space-y-5 overflow-y-scroll">
      <SheetHeader>
        <SheetTitle>Add account</SheetTitle>
        <SheetDescription>
          All fields are required so enter all the values to add student
          account.
        </SheetDescription>
      </SheetHeader>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rollNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roll Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="batch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Batch</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="division"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Division</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SheetFooter>
            <Button
              type="submit"
              disabled={addStudent.isPending}
              isLoading={addStudent.isPending}
              className="space-x-2"
            >
              Add Account
            </Button>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
