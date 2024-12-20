'use client'
import { useState } from "react";

// components
import InputField from "@/components/shared/inputField";
import GroupsData from "./components/groupsData";
import { Input } from "@/components/ui/input";

export default function GroupsPage() {
    const [searchText, setSearchText] = useState('')
    return (
        <div className="h-full">
            <div className="header flex justify-between items-center">
                <div className="flex justify-between items-center w-full">
                    <h1 className="text-title-28">Groups</h1>
                </div>
            </div>

            <div className="mt-5">
                <GroupsData />
            </div>
        </div>
    )
}