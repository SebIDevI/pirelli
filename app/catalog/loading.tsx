import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="container">
        <Skeleton className="w-full rounded-xl mt-20 min-h-[50vh]" />
      </div>
      <div className="bg-white mt-10 py-10">
        <div className="container">
          <Skeleton className="w-[700px] h-10 rounded-2xl bg-[#e6e6e6]" />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 lg:grid-cols-3 mt-16">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton
                  key={index}
                  className="w-full rounded-xl aspect-square bg-[#e6e6e6]"
                />
                <div className="flex gap-4">
                  <Skeleton
                    key={index}
                    className="w-full rounded-full h-6 bg-[#e6e6e6]"
                  />
                  <Skeleton
                    key={index}
                    className="w-[30%] rounded-full h-6 bg-[#e6e6e6]"
                  />
                </div>
                <Skeleton
                  key={index}
                  className="w-full rounded-full h-6 bg-[#e6e6e6]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
