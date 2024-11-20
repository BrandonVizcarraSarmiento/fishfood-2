import { Skeleton } from "@/components/ui/skeleton";

export function MisionVisionSkeleton() {
    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 justify-items-center my-20">
                {/* Skeleton Card 1 */}
                <div className="flex flex-col items-center space-y-4 bg-slate-200 dark:bg-slate-950 rounded-lg p-4">
                    <Skeleton className="h-64 w-64 rounded-lg" />
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>

                {/* Skeleton Card 2 */}
                <div className="flex flex-col items-center space-y-4 bg-slate-200 dark:bg-slate-950 rounded-lg p-4">
                    <Skeleton className="h-64 w-64 rounded-lg" />
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>

                {/* Skeleton Card 3 */}
                <div className="flex flex-col items-center space-y-4 bg-slate-200 dark:bg-slate-950 rounded-lg p-4">
                    <Skeleton className="h-64 w-64 rounded-lg" />
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
    );
}

export default MisionVisionSkeleton;
