import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const InfoAboutSkeleton = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center my-20 mx-10">
                {/* Card simulada 1 */}
                <Card className="flex flex-col items-center text-center space-y-2 bg-slate-200 dark:bg-slate-950">
                    <CardContent>
                        <Skeleton className="h-64 w-64 rounded-lg" />
                    </CardContent>
                    <CardFooter>
                        <Skeleton className="h-6 w-4/5 rounded-md" />
                        <Skeleton className="h-6 w-3/4 rounded-md" />
                    </CardFooter>
                </Card>

                {/* Card simulada 2 */}
                <Card className="flex flex-col items-center text-center space-y-2 bg-slate-200 dark:bg-slate-950">
                    <CardContent>
                        <Skeleton className="h-64 w-64 rounded-lg" />
                    </CardContent>
                    <CardFooter>
                        <Skeleton className="h-7 w-4/5 rounded-md" />
                        <Skeleton className="h-7 w-3/4 rounded-md" />
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default InfoAboutSkeleton;