'use client'
import { useAddFaulty } from "../services/mutation"
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import addFacultyValidator from "@/validator/addFaculty.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function AddFacultyModel({ data, setData }) {
    const addFaulty = useAddFaulty()
    const form = useForm({
        resolver: zodResolver(addFacultyValidator),
        defaultValues: {
            name: '',
            employeeNumber: '',
            email: '',
            phoneNumber: '',
            designation: '',
        }
    })

    const onSubmit = (value) => {
        const data = {
            name: value.name,
            employeeCode: value.employeeNumber,
            email: value.email,
            mobileNumber: value.phoneNumber,
            designation: value.designation,
            subjectCode: value.subjectCode,
            subjectName: value.subjectName
        }
        addFaulty.mutate(data, {
            onSuccess: (data) => {
                if (data.success) {
                    form.reset();
                }
            }
        })
    }
    return (
        <SheetContent className="space-y-5 overflow-y-scroll">
            <SheetHeader>
                <SheetTitle>Add account</SheetTitle>
                <SheetDescription>All fields are required so enter all the values to add faculty account.</SheetDescription>
            </SheetHeader>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
                        )} />
                    <FormField
                        control={form.control}
                        name="employeeNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Employee Number</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
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
                        )} />
                    <FormField
                        control={form.control}
                        name="designation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Designation</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    {/* <FormField
                        control={form.control}
                        name="subjectCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject Code</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="subjectName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} /> */}
                    <SheetFooter>
                        {/* <Button type="button" disabled={addFaulty.isPending} onClick={() => setData(false)} variant="ghost">
                            Cancel
                        </Button> */}
                        <Button type="submit" disabled={addFaulty.isPending}
                            isLoading={addFaulty.isPending}
                            className="space-x-2">
                            Add Account
                        </Button>
                    </SheetFooter>
                </form>
            </Form>

        </SheetContent>
    )
}