import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-white dark:bg-black pt-10">
      <div className="container">
        <Skeleton className="w-1/4 h-4 mb-6 mt-16" />
        <div className="flex flex-col gap-16 w-full lg:flex-row items-start justify-between font-gothamLight">
          <div className="w-full flex-1 space-y-4">
            <Skeleton className="w-full aspect-square" />
            <div className="flex gap-4">
              <Skeleton className="w-20 aspect-square" />
              <Skeleton className="w-20 aspect-square" />
              <Skeleton className="w-20 aspect-square" />
            </div>
            <Skeleton className="w-2/3 h-10 mb-3" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-2/3 h-5" />
            <div className="font-medium w-full flex-1 text-secondary-foreground">
              <Skeleton className="w-2/3 h-8 mb-6" />
              <Skeleton className="w-full h-6 mb-4" />
              <Skeleton className="w-1/2 h-6" />
              <Skeleton className="w-1/2 h-12 my-10" />
              <Skeleton className="w-full h-8 mb-10" />
              <Skeleton className="w-1/2 h-12 mt-20" />
            </div>
            <div className="space-y-2 pb-8">
              <Skeleton className="w-1/2 h-8 mb-3 mt-20" />
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-full h-6" />
            </div>
          </div>
          <div className="hidden lg:block font-medium w-full flex-1 text-secondary-foreground lg:sticky top-24">
            <Skeleton className="w-2/3 h-8 mb-6" />
            <Skeleton className="w-full h-6 mb-4" />
            <Skeleton className="w-1/2 h-6" />
            <Skeleton className="w-1/2 h-12 my-10" />
            <Skeleton className="w-full h-8 mb-10" />
            <Skeleton className="w-1/2 h-12 mt-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
