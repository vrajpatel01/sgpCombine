'use client';
// components
import { Warper } from "./warper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UserInformation({ myInformation }) {
    return (
        <Warper title='Personal Information' description="You can update your personal information from here.">
            <form className="space-y-4" noValidate>
                <div className="py-3 flex flex-col gap-4">
                    <div>
                        <Label htmlFor="name" >name</Label>
                        <Input
                            title='Name'
                            id="name"
                            className='w-full truncate'
                            value={myInformation.hod.name}
                            disabled />
                    </div>
                    <div>
                        <Label htmlFor="employeeCode" >employee code</Label>
                        <Input
                            title='Employee Code'
                            className='w-full truncate'
                            id="employeeCode"
                            value={myInformation.hod.employeeCode}
                            disabled />
                    </div>
                    <div>
                        <Label htmlFor="phoneNumber" >phone number</Label>
                        <Input
                            title='Mobile Number'
                            className='w-full truncate'
                            type='number'
                            id="phoneNumber"
                            value={myInformation.hod.mobileNumber}
                            disabled />
                    </div>
                    <div>
                        <Label htmlFor="institute" >institute</Label>
                        <Input
                            title='Institute'
                            className='w-full truncate'
                            type='text'
                            id="institute"
                            value={myInformation.hod.institute.name}
                            disabled />
                    </div>
                    <div>
                        <Label htmlFor="department" >department</Label>
                        <Input
                            title='Department'
                            className='w-full truncate'
                            type='text'
                            id="department"
                            value={myInformation.hod.department.name}
                            disabled />
                    </div>
                </div>
            </form>
        </Warper>
    )
}