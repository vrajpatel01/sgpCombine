'use client';
import { useEffect } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { useGetSemesterDates } from "../services/query";
import getFormateDate from "@/utils/getFormateDate";
import { useSetSemesterDate } from "../services/mutation";
import Skeleton from "react-loading-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function SemesterDate({ state, setState, setSemesterDateModel, setSemesterDate, semesterDate, title, description, type }) {

    const semesterDates = useGetSemesterDates()
    const setSemesterDates = useSetSemesterDate();

    useEffect(() => {
        if (semesterDates.isSuccess) {
            if (semesterDates.data.data.semesterStartDate == null || semesterDates.data.data.semesterEndDate == null) {
                return;
            }
            setSemesterDate({
                start: new Date(semesterDates.data.data.semesterStartDate),
                end: new Date(semesterDates.data.data.semesterEndDate),
            })
        }
    }, [semesterDates.data])

    const handlerDateSubmit = () => {
        const startDate = getFormateDate(semesterDate.start)
        const endDate = getFormateDate(semesterDate.end)

        const data = {
            semesterStartDate: startDate,
            semesterEndDate: endDate
        }

        setSemesterDates.mutate(data);
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="font-normal">Semester Date</CardTitle>
                </CardHeader>
                <CardContent>
                    {semesterDates.isPending && <div className="py-3 flex flex-col gap-4 w-full">
                        <div>
                            <Skeleton width='full' height={30} />
                            <Skeleton width='full' height={30} />
                        </div>
                        <div className="flex justify-between items-center mt-5">
                            <Skeleton width={150} height={40} />
                            <Skeleton width={150} height={40} />
                        </div>
                    </div>}
                    {semesterDates.isSuccess && <div className="py-3 flex flex-col gap-7 w-full">
                        <div className="text-body-16 text-light-text">Select the date when semester is start and date when semester is end. This date is not change after you confirm it so please select carefully.</div>
                        <div className="flex justify-center items-center select-none flex-col sm:flex-row mt-5">
                            <div className="flex justify-start items-start gap-1 flex-col w-full sm:max-w-min relative">
                                <div className="text-body-16 absolute -top-7">Start Date</div>
                                <Popover>
                                    <PopoverTrigger className="flex justify-start items-center w-full sm:max-w-min gap-3 bg-white !rounded-md border-[0.5px] border-opacity-50 !border-border p-3 focus:ring-primary-text focus:ring-2 focus:border-primary-text focus:bg-primary-text focus:bg-opacity-5 focus:text-primary-text">
                                        <CiCalendarDate className="text-xl" />
                                        {console.log(semesterDate.start)}
                                        <div type="text" className="border-none outline-none whitespace-nowrap">{semesterDate.start != undefined ? semesterDate.start?.toDateString() : 'pick a date'}</div>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0 border-none">
                                        <Calendar
                                            mode="single"
                                            selected={semesterDate.start}
                                            onSelect={(date) => setSemesterDate({
                                                ...semesterDate,
                                                start: date
                                            })}
                                            className="rounded-md border" />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="sm:w-full">
                                <div className="hidden text-body-16 opacity-0 select-none">Start Date</div>
                                <div className="h-[50px] w-[.5px] sm:w-full sm:min-w-6 sm:h-[.5px] bg-border"></div>
                            </div>
                            <div className="flex justify-start items-start gap-1 flex-col w-full sm:max-w-min relative">
                                <div className="text-body-16 absolute -top-7">End Date</div>
                                <Popover>
                                    <PopoverTrigger className="flex justify-start items-center w-full sm:max-w-min gap-3 bg-white !rounded-md border-[0.5px] border-opacity-50 !border-border p-3 focus:ring-primary-text focus:ring-2 focus:border-primary-text focus:bg-primary-text focus:bg-opacity-5 focus:text-primary-text">
                                        <CiCalendarDate className="text-xl" />
                                        <div type="text" className="border-none outline-none whitespace-nowrap">{semesterDate.end != undefined ? semesterDate.end?.toDateString() : 'pick a date'}</div>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0 border-none">
                                        <Calendar
                                            mode="single"
                                            selected={semesterDate.end}
                                            onSelect={(date) => setSemesterDate({
                                                ...semesterDate,
                                                end: date
                                            })}
                                            className="rounded-md border" />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                onClick={() => {
                                    // setSemesterDateModel(true);
                                    handlerDateSubmit();
                                }}
                                isLoading={setSemesterDates.isPending}
                                disabled={setSemesterDates.isPending}
                                className='min-w-[100px]'>
                                Set
                            </Button>
                        </div>
                    </div>}
                </CardContent>
            </Card>
        </>
    )
}