'use client';
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";
import { useGetGroupLimit } from "../services/query";
import { useSetGroupLimit } from "../services/mutation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MemberLimit({ setGroupLimit, groupLimit }) {
    const getGroupLimit = useGetGroupLimit()
    const setGLimit = useSetGroupLimit()
    useEffect(() => {
        if (getGroupLimit?.data?.success) {
            setGroupLimit(getGroupLimit?.data?.grMaximumMembers)
        }
    }, [getGroupLimit.data])

    const handleGroupLimit = (e) => {
        e.preventDefault();
        setGLimit.mutate({ grMaximumMembers: groupLimit })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-normal">Group Member Limit</CardTitle>
            </CardHeader>
            <CardContent>
                {getGroupLimit.isPending && <div className="py-3 flex flex-col gap-4 w-full">
                    <div>
                        <Skeleton width='full' height={30} />
                        <Skeleton width='full' height={30} />
                        <Skeleton width='full' height={30} />
                    </div>
                </div>}
                {getGroupLimit.isSuccess && <div className="py-3 flex flex-col gap-2 w-full">
                    <div className="text-body-16 text-light-text">Select the how many members have in one group default value is 3(three) if your want to update the default value enter the maximum group size.</div>
                    <form onSubmit={handleGroupLimit} className="py-3 flex flex-col gap-4 w-full" noValidate>
                        <div className="flex justify-end w-full gap-5">
                            <Input
                                className='max-w-[200px] border-[0.5px]'
                                placeholder={3}
                                type='number'
                                onChange={(e) => setGroupLimit(e.target.value)}
                                value={groupLimit}
                                maxLength={1} />
                            <Button
                                type="submit"
                                isLoading={setGLimit.isPending}
                                disabled={setGLimit.isPending}
                                className="min-w-[100px]" >
                                Set
                            </Button>
                        </div>
                    </form>
                </div>}
            </CardContent>
        </Card>
    )
}