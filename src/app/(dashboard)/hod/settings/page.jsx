'use client';
import Button from "@/components/shared/button";
import PasswordChange from "./components/passwordChange";
import UserInformation from "./components/userInformation";
import { Warper } from "./components/warper";
import { signOut } from "next-auth/react";
import { useMyInformation } from "./services/query";
import SettingsSkelton from "./components/settingsSkelton";
import Error from "@/components/shared/error";

export default function ProfileScreen() {
    const myInfo = useMyInformation();
    if (myInfo.isPending) {
        return <SettingsSkelton />
    }

    if (myInfo.isError) {
        return (
            <div className="h-screen">
                <Error message='Having some problem please try again later.' />
            </div>
        )
    }
    return (
        <div className="h-full max-w-[900px] mx-auto">
            <div className="header flex justify-between items-center">
                <h1 className="text-title-28">Settings</h1>
            </div>

            <div className="space-y-5 mt-10">
                <UserInformation myInformation={myInfo.data} />
                <PasswordChange />
                <Warper title='Logout' className='border-t-[.5px] border-gray-500 pt-5'>
                    <div className="text-sm text-gray-500">
                        End your session and securely sign out of your account. Make sure to save any changes before signing out to avoid losing your progress.
                    </div>
                    <div onClick={() => signOut()} className="flex justify-end">
                        <Button className='bg-destructive text-white text-sm' label="Logout" />
                    </div>
                </Warper>
            </div>
        </div>
    )
}