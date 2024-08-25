import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-[99vw] h-[99vh] dark bg-secondary/90">
      <div className="container h-screen flex items-start flex-col justify-center relative py-20">
        <Skeleton className="w-1/2 h-16 mb-4" />
        <Skeleton className="w-1/3 h-10" />
      </div>
    </div>
  );
}
