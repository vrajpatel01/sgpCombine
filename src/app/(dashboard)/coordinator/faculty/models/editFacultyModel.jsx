import { useEffect } from "react"
import { useEditFacultyAccount } from "../services/mutation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import addFacultyValidator from "@/validator/addFaculty.validator"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

export default function EditFacultyModel({ setData, currentUserData, setCoordinatorModel }) {
    const editAccount = useEditFacultyAccount()

    const form = useForm({
        resolver: zodResolver(addFacultyValidator),
        defaultValues: {
            name: currentUserData?.name,
            employeeNumber: currentUserData?.employeeCode,
            email: currentUserData?.email,
            phoneNumber: currentUserData?.mobileNumber,
            designation: currentUserData?.designation,
        }
    })

    useEffect(() => {
        form.setValue('name', currentUserData?.name)
        form.setValue('employeeNumber', currentUserData?.employeeCode)
        form.setValue('email', currentUserData?.email)
        form.setValue('phoneNumber', currentUserData?.mobileNumber)
        form.setValue('designation', currentUserData?.designation)
    }, [currentUserData])

    const onSubmit = (value) => {
        const data = {
            payload: {
                ...(currentUserData.name !== value.name && { name: value.name.trim() }),
                ...(currentUserData.employeeCode !== value.employeeNumber && { employeeCode: value.employeeNumber.trim() }),
                ...(currentUserData.email !== value.email && { email: value.email }),
                ...(currentUserData.mobileNumber !== value.phoneNumber && { mobileNumber: value.phoneNumber }),
                ...(currentUserData.designation !== value.designation && { designation: value.designation.trim() }),
            },
            id: currentUserData._id
        }
        editAccount.mutate(data, {
            onSuccess: () => {
                form.reset();
                setData(false)
            }
        })
    }

    return (
        <SheetContent className="space-y-5 overflow-y-scroll">
            <SheetHeader>
                <SheetTitle>Edit account</SheetTitle>
                <SheetDescription>edit faculty account information</SheetDescription>
            </SheetHeader>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
                <Button onClick={() => {
                    setData(false)
                    setCoordinatorModel(true)
                }} variant='secondary'>Make an Coordinator</Button>
                <Button variant='secondary'>Remove a Coordinator</Button>
            </div>
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