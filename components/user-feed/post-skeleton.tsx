import { Skeleton } from "@/components/ui/skeleton";

export default function PostSkeleton() {
  return (
    <div className="p-1 space-y-1">

      <div className="flex items-center space-x-1">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-[60%]" />
        <Skeleton className="h-4 w-[20%]" />
      </div>
      <div className="flex items-center space-x-2 mt-1">
        <Skeleton className="h-3 w-[10%]" /> {/* Points */}
        <Skeleton className="h-3 w-[15%]" /> {/* Username */}
        <Skeleton className="h-3 w-[10%]" /> {/* Time */}
        <Skeleton className="h-3 w-[5%]" /> {/* | */}
        <Skeleton className="h-3 w-[20%]" /> {/* Comments */}
      </div>
    </div>
  );
}
