'use client'
import GroupsData from "./components/groupsData";

export default function GroupsPage() {
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