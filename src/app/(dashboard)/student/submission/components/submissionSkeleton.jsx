import {Skeleton} from '@/components/ui/skeleton';

export function SubmissionSkeleton () {
    return (
        <div className='space-y-5 w-full h-full'>
            <Skeleton className='w-40 h-10'/>
            <Skeleton className='w-full h-10'/>
            <Skeleton className='w-full h-32'/>
            <Skeleton className='w-full h-32'/>
        </div>
        )
}