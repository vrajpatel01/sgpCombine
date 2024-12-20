import { WeekList } from "./components/weekList";

export default function WeekLayout({ children }) {
    return (
        <div className="submissionSidebar flex justify-start items-start flex-col lg:flex-row lg:w-auto h-auto lg:h-full gap-5">
            {/* <div className="absolute top-20 left-0 right-0 lg:left-auto md:right-auto lg:bottom-0 lg:top-0 p-5 lg:px-0 z-50"> */}
            <div className="absolute left-0 right-0 lg:left-auto lg:right-auto lg:bottom-0 lg:top-0 lg:py-5 z-20 min-w-[280px]">
                <WeekList />
            </div>
            <div className="w-full lg:ml-[18.4rem] mt-24 lg:mt-0">
                {children}
            </div>
        </div>
    )
}