import Link from "next/link";

// icons
import { PiUsersFourFill } from "react-icons/pi";

export default function FacultyListItem({ data }) {
    return (
        <Link href={`/coordinator/assign/${data.employeeCode}?fid=${data._id}`}>
            <div className="bg-white p-5 rounded-md shadow-sm flex justify-start items-start flex-col gap-3 cursor-pointer">
                <div className="flex justify-start items-center gap-2">
                    <span className="text-body-18 font-medium capitalize">{data.name}</span>
                    -
                    <span className="text-body-16 text-light-text">{data.employeeCode}</span>
                </div>
                <div className="text-light-text flex justify-between items-center w-full">
                    <div>
                        <div className="text-body-16 text-primary-text">Phone Number</div>
                        <div className="text-body-16">{data.mobileNumber}</div>
                    </div>
                    <div title="total assigned groups" className="flex justify-center items-center rounded-md bg-secondary-background overflow-hidden">
                        <div className="p-2 bg-primary">
                            <PiUsersFourFill className="text-xl text-white" />
                        </div>
                        <span className="p-2 px-3 text-center text-primary-text">{data.grCount}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}