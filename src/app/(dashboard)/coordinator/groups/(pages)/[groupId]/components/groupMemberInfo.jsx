// components
import GroupMemberInfoItem from "./groupMemberInfoItem";

export default function GroupMemberInfo({ group }) {
    return (
        <div className="w-full sm:min-w-min">
            <div className="text-body-18 font-medium p-3 px-5 bg-white mb-4 rounded-md text-primary-text shadow-sm flex justify-between items-center">
                <span>Group Members</span>
                <div className="px-3 rounded-full bg-primary text-secondary-text text-body-16">{group?.students?.length}</div>
            </div>
            <div className="text-light-text flex justify-start items-start flex-col gap-3 w-full">
                {group?.students.map((student, index) => (
                    <GroupMemberInfoItem
                        key={student.id}
                        details={student}
                        admin={index === 0 ? true : undefined}
                        className='cursor-pointer' />
                ))}
            </div>
        </div>
    )
}