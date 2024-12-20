import { IoDocumentsSharp } from "react-icons/io5";

export default function WeeklyReports() {
    return (
        <div className="flex justify-center items-center flex-col gap-5 h-screen text-gray-500 select-none">
            <IoDocumentsSharp size={50} />
            <span>Verify groups reports</span>
        </div>
    )
}