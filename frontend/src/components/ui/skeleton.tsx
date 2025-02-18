import { cn } from "@/lib/utils"

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-blue-500/10", className)}
      {...props}
    />
  )
}


export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 absolute left-4 bottom-0">
      <Skeleton className="h-4 w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}


export default  SkeletonCard 
