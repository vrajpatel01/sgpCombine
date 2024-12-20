import { Skeleton } from "@/components/ui/skeleton"

export const GroupMembersSkeleton = () => {
    return (
        <div className="space-y-5">
            <Skeleton className='w-full h-10' />
            <Skeleton className='w-full h-10' />
            <Skeleton className='w-full h-10' />
            <Skeleton className='w-full h-10' />
        </div>
    )
}