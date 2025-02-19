import { Skeleton } from "@/components/ui/skeleton";

export const ProjectInformationSkeleton = () => {
  return (
    <div className="space-y-5 min-w-full">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-20 w-full" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 w-full">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
