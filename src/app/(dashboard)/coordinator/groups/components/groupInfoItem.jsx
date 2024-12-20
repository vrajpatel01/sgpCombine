import { useState } from "react";
import Link from "next/link";

import { IoLockClosed, IoLockOpen } from "react-icons/io5";
import { usePathname } from "next/navigation";

export default function GroupInfoItem({ group, className, onClick, checkBox, onCheckBoxChange = () => { }, link = '' }) {
    const pathname = usePathname();

    const [select, setSelect] = useState(false)
    return (
        <Link href={`${pathname}/${group._id}`}>
            <div onClick={(e) => {
                if (checkBox) {
                    setSelect(!select)
                    onClick(e, select)
                }
            }} className={`p-5 rounded-md shadow-sm flex justify-start items-start flex-col gap-1 cursor-pointer overflow-hidden ${select ? 'bg-secondary-background border-primary' : 'bg-white'} ${className}`}>
                <div className="flex justify-start items-center gap-4 w-full">
                    {checkBox && <input
                        checked={select}
                        onChange={(e) => {
                            setSelect(e.target.checked);
                            onCheckBoxChange(e)
                        }}
                        hidden
                        type="checkbox"
                        className="accent-primary cursor-pointer w-5 h-5" />}
                    <div className="flex justify-between items-center w-full">
                        <span title="group id" className="text-body-18 font-medium">{group?.groupId}</span>
                        <span title="group id" className="text-body-18 font-medium p-2 rounded-md bg-secondary-background">
                            <div>
                                {group?.isLocked ? <IoLockClosed /> : <IoLockOpen />}
                            </div>
                        </span>
                    </div>
                </div>
                <div className="flex justify-start items-start gap-3">
                    <div className="text-body-16 text-light-text">Title</div>
                    <div title="leader name" className="text-body-16 capitalize">{group?.title}</div>
                </div>
                <div className="flex justify-start items-start gap-3">
                    <div className="text-body-16 text-light-text">Leader</div>
                    <div title="leader name" className="text-body-16 capitalize">{group?.leader}</div>
                </div>
            </div>
        </Link>
    )
}