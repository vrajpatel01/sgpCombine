import { useEffect } from "react"
// network
import { useEditStudentAccount } from "../services/mutation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import addStudentValidator from "@/validator/addStudent.validator"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function EditStudentModel({ setData, currentUserData }) {
    const editAccount = useEditStudentAccount()
    const form = useForm({
        resolver: zodResolver(addStudentValidator),
        defaultValues: {
            name: currentUserData?.name,
            rollNumber: currentUserData?.rollNumber,
            email: currentUserData?.email,
            phoneNumber: currentUserData?.phoneNumber,
            semester: currentUserData?.semester,
            division: currentUserData?.division,
            batch: currentUserData?.batch
        }
    })

    useEffect(() => {
        form.setValue('name', currentUserData?.name)
        form.setValue('rollNumber', currentUserData?.rollNumber)
        form.setValue('email', currentUserData?.email)
        form.setValue('phoneNumber', currentUserData?.phoneNumber)
        form.setValue('semester', currentUserData?.semester?.toString())
        form.setValue('division', currentUserData?.division)
        form.setValue('batch', currentUserData?.batch)
    }, [currentUserData])


    const onSubmit = (value) => {
        const data = {
            payload: {
                ...(currentUserData.name !== value.name && { name: value.name.toLowerCase() }),
                ...(currentUserData.rollNumber !== value.rollNumber && { rollNumber: value.rollNumber }),
                ...(currentUserData.email !== value.email && { email: value.email.toLowerCase() }),
                ...(currentUserData.phoneNumber !== value.phoneNumber && { phoneNumber: value.phoneNumber }),
                ...(currentUserData.semester !== value.semester && { semester: parseInt(value.semester) }),
                ...(currentUserData.division !== value.division && { division: value.division.toLowerCase() }),
                ...(currentUserData.batch !== value.batch && { batch: value.batch.toLowerCase() })
            },
            id: currentUserData._id
        }
        editAccount.mutate(data, {
            onSuccess: () => {
                form.reset()
                setData(false)
            }
        })
    }

    return (
        <SheetContent className="space-y-5 overflow-y-scroll">
            <SheetHeader>
                <SheetTitle>Edit account</SheetTitle>
                <SheetDescription>edit student account information</SheetDescription>
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
                        name="rollNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Roll Number</FormLabel>
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
                                    <Input type="email" {...field} />
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
                        name="batch"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Batch</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="semester"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Semester</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="semester" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
                                                <SelectItem value="3">3</SelectItem>
                                                <SelectItem value="4">4</SelectItem>
                                                <SelectItem value="5">5</SelectItem>
                                                <SelectItem value="6">6</SelectItem>
                                                <SelectItem value="7">7</SelectItem>
                                                <SelectItem value="8">8</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

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
                            )} />
                    </div>

                    <SheetFooter>
                        {/* <Button type="button" disabled={editAccount.isPending} onClick={() => setData(false)} variant="ghost">
                            Cancel
                        </Button> */}
                        <Button type="submit" disabled={editAccount.isPending}
                            isLoading={editAccount.isPending}
                            className="space-x-2">
                            Change
                        </Button>
                    </SheetFooter>
                </form>
            </Form>
        </SheetContent>
    )
}