import { cn } from "@/lib/utils"

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#72CCD7]/10", className)}
      {...props}
    />
  );
}


export function SkeletonCard() {
  return (
    <div className="flex pl-4 flex-col space-y-3 w-full">
      <Skeleton className="h-4 w-1/2 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}


export default  SkeletonCard 
