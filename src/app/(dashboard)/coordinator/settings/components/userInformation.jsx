'use client';

// components
import { Warper } from "./warper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMe } from "../services/query";
import Skeleton from "react-loading-skeleton";

export default function UserInformation() {
    const me = useMe();
    const data = me.data?.faculty;

    return (
        <Warper title='Personal Information' description="You can update your personal information from here.">
            <form className="space-y-4" noValidate>
                <div>
                    <Label htmlFor="name">name</Label>
                    {me.isLoading && <Skeleton height={36} />}
                    {me.isSuccess &&
                        <Input
                            id="name"
                            value={data.name}
                            disabled />}
                </div>
                <div>
                    <Label htmlFor="employeeCode">employee code</Label>
                    {me.isLoading && <Skeleton height={36} />}
                    {me.isSuccess &&
                        <Input
                            id="employeeCode"
                            value={data.employeeCode}
                            disabled />}
                </div>
                <div>
                    <Label htmlFor="phoneNumber">mobile number</Label>
                    {me.isLoading && <Skeleton height={36} />}
                    {me.isSuccess &&
                        <Input
                            id="phoneNumber"
                            value={data.mobileNumber}
                            disabled />}
                </div>
                <div>
                    <Label htmlFor="designation">designation</Label>
                    {me.isLoading && <Skeleton height={36} />}
                    {me.isSuccess &&
                        <Input
                            id="designation"
                            value={data.designation}
                            disabled />}
                </div>
                <div>
                    <Label htmlFor="subjectCode">subject code</Label>
                    {me.isLoading && <Skeleton height={36} />}
                    {me.isSuccess &&
                        <Input
                            id="subjectCode"
                            value={data.subjectCode}
                            disabled />}
                </div>
                <div>
                    <Label htmlFor="subjectName">subject name</Label>
                    {me.isLoading && <Skeleton height={36} />}
                    {me.isSuccess &&
                        <Input
                            id="subjectName"
                            value={data.subjectCode}
                            disabled />}
                </div>
                <div>
                    <Label htmlFor="institute">institute</Label>
                    {me.isLoading && <Skeleton height={36} />}
                    {me.isSuccess &&
                        <Input
                            id="institute"
                            value={data.institute.name}
                            disabled />}
                </div>
                <div>
                    <Label htmlFor="department">department</Label>
                    {me.isLoading && <Skeleton height={36} />}
                    {me.isSuccess &&
                        <Input
                            id="department"
                            value={data.department.name}
                            disabled />}
                </div>
            </form>
        </Warper>
    )
}