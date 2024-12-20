import Skeleton from "react-loading-skeleton";
import { useGetFaulty } from "../../faculty/services/query";
import FacultyListItem from "./facultyListItem";
import Error from "@/components/shared/error";

export default function AssignData() {
    const faculties = useGetFaulty()

    if (faculties.isError) return <Error message="Having some problem to fetch data." />
    if (faculties.isSuccess && faculties?.data?.faculties.length === 0) {
        return (
            <div>
                <Error message="Currently not exists any account." />
            </div>
        )
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {faculties.isPending && Array(20).fill(0).map((_, i) => (
                <Skeleton height={150} />
            ))}
            {faculties.isSuccess && faculties.isSuccess && faculties?.data?.faculties?.map((faculty) => (
                <FacultyListItem data={faculty} />
            ))}
        </div>
    )
}