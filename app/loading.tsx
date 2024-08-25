import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container h-screen flex items-center flex-col justify-start relative py-20">
      <Skeleton className="w-1/2 h-10 mb-4" />
      <Skeleton className="w-1/3 h-10" />
    </div>
  );
}
