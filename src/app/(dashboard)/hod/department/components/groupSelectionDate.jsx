'use client';
import { useEffect } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { useGetGroupSelectionDates } from "../services/query";
import { useSetGroupSelectionDate } from "../services/mutation";
import Skeleton from "react-loading-skeleton";
import getFormateDate from "@/utils/getFormateDate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function GroupSelectionDate({ state, setState, setGroupSelectionDate, groupSelectionDate, setGroupSelectionDateModel }) {

    const groupDate = useGetGroupSelectionDates()
    const setGroupSDate = useSetGroupSelectionDate()

    useEffect(() => {
        if (groupDate.isSuccess) {
            if (groupDate.data.data.grSelectionStartDate == null || groupDate.data.data.grSelectionStartDate == null) {
                return;
            }
            console.log(groupDate.data.data.grSelectionStartDate);
            setGroupSelectionDate({
                start: new Date(groupDate.data.data.grSelectionStartDate),
                end: new Date(groupDate.data.data.grSelectionEndDate),
            })
        }
    }, [groupDate.data])

    const handleDateSubmit = () => {
        const startDate = getFormateDate(groupSelectionDate.start)
        const endDate = getFormateDate(groupSelectionDate.end)

        const data = {
            grSelectionStartDate: startDate,
            grSelectionEndDate: endDate
        }

        setGroupSDate.mutate(data);
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="font-normal">Group Selection Date</CardTitle>
                </CardHeader>
                <CardContent>
                    {groupDate.isPending && <div className="py-3 flex flex-col gap-4 w-full">
                        <div>
                            <Skeleton width='full' height={30} />
                            <Skeleton width='full' height={30} />
                        </div>
                        <div className="flex justify-between items-center mt-5">
                            <Skeleton width={150} height={40} />
                            <Skeleton width={150} height={40} />
                        </div>
                    </div>}
                    {groupDate.isSuccess && <div className="py-3 flex flex-col gap-7 w-full">
                        <div>
                            <div className="text-body-16 text-light-text">Select the date when the students will start the creating groups and also select the date when students end the group selection. This date is not change after you confirm it so please select carefully.</div>
                        </div>
                        <div className="flex justify-center items-center select-none flex-col sm:flex-row mt-5">
                            <div className="flex justify-start items-start gap-1 flex-col w-full sm:max-w-min relative">
                                <div className="text-body-16 absolute -top-7">Start Date</div>
                                <Popover>
                                    <PopoverTrigger className="flex justify-start items-center w-full sm:max-w-min gap-3 bg-white !rounded-md border-[0.5px] border-opacity-50 !border-border p-3 focus:ring-primary-text focus:ring-2 focus:border-primary-text focus:bg-primary-text focus:bg-opacity-5 focus:text-primary-text">
                                        <CiCalendarDate className="text-xl" />
                                        <div type="text" className="border-none outline-none whitespace-nowrap">{groupSelectionDate.start != undefined ? groupSelectionDate.start?.toDateString() : 'pick a date'}</div>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0 border-none">
                                        <Calendar
                                            mode="single"
                                            selected={groupSelectionDate.start}
                                            onSelect={(date) => setGroupSelectionDate({
                                                ...groupSelectionDate,
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
                                        <div type="text" className="border-none outline-none whitespace-nowrap">{groupSelectionDate.end != undefined ? groupSelectionDate.end?.toDateString() : 'pick a date'}</div>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0 border-none">
                                        <Calendar
                                            mode="single"
                                            selected={groupSelectionDate.end}
                                            onSelect={(date) => setGroupSelectionDate({
                                                ...groupSelectionDate,
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
                                    // setGroupSelectionDateModel(true)
                                    handleDateSubmit();
                                }}
                                disabled={setGroupSDate.isPending}
                                isLoading={setGroupSDate.isPending}
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