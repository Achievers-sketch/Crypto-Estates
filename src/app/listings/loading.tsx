import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Skeleton className="h-10 w-1/3 mx-auto" />
        <Skeleton className="h-5 w-1/2 mx-auto mt-4" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
            <Skeleton className="h-[500px] w-full" />
        </aside>
        <main className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-48" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                    </div>
                </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
