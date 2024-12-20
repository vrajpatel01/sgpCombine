import { useState } from "react"

// components
import InputField from "@/components/shared/inputField"
import GroupInfoItem from "./groupInfoItem"

export default function GroupInfo() {
    const [searchString, setSearchString] = useState("")
    return (
        <div className="w-full h-full">
            <div className="flex justify-end w-full">
                <InputField
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    placeholder="Search group..."
                    className='w-full md:min-w-[400px] !border-1' />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                <GroupInfoItem link='/groups/group56' />
                <GroupInfoItem link='/groups/group56' />
                <GroupInfoItem link='/groups/group56' />
                <GroupInfoItem link='/groups/group56' />
                <GroupInfoItem link='/groups/group56' />
                <GroupInfoItem link='/groups/group56' />
                <GroupInfoItem link='/groups/group56' />
                <GroupInfoItem link='/groups/group56' />
                <GroupInfoItem link='/groups/group56' />
                <GroupInfoItem link='/groups/group56' />
                <GroupInfoItem link='/groups/group56' />
                <GroupInfoItem link='/groups/group56' />
                <GroupInfoItem link='/groups/group56' />
                <GroupInfoItem link='/groups/group56' />
                <GroupInfoItem link='/groups/group56' />
                <GroupInfoItem link='/groups/group56' />
                <GroupInfoItem link='/groups/group56' />
                <GroupInfoItem link='/groups/group56' />
                <GroupInfoItem link='/groups/group56' />
            </div>
        </div>
    )
}