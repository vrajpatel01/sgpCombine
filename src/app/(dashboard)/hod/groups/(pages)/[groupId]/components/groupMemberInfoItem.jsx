// icons
import { FaCrown } from "react-icons/fa6";

export default function GroupMemberInfoItem({ details, admin, onClick = () => { }, className }) {
    return (
        <div onClick={onClick} className={`w-full sm:min-w-[300px] bg-white shadow-sm rounded-md py-4 px-5 ${admin && 'border-primary border-2 relative'} ${className}`}>
            <div className="flex justify-between items-center">
                <div className="text-body-18 text-primary-text">{details?.name}</div>
                <span className="text-small-12 p-1 rounded-sm bg-secondary-background">{details?.email?.split('@')[0]}</span>
                {admin && <FaCrown className="text-2xl text-primary absolute right-5 -bottom-1" />}
            </div>
            <div className="text-body-16">{details?.email}</div>
        </div>
    )
}