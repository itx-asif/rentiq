import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
    return (
        <div className="space-y-8 p-6">
            <Skeleton className="h-10 w-1/3" />

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="h-[100px] w-full rounded-xl" />
                <Skeleton className="h-[100px] w-full rounded-xl" />
                <Skeleton className="h-[100px] w-full rounded-xl" />
            </div>

            {/* Recent Properties Header */}
            <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-8 w-24" />
            </div>

            {/* Property Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-[280px] w-full rounded-xl" />
                ))}
            </div>
        </div>
    );
};

export default DashboardSkeleton;
