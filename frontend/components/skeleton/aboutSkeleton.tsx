import { Skeleton } from "@/components/ui/skeleton";

const AboutSkeleton = () => {
    return (
        <div className="flex flex-col items-center justify-center px-4 md:px-20 lg:px-40 py-10 md:py-16 text-center my-20">
            {/* Título */}
            <Skeleton className="h-8 w-2/3 mb-4 rounded-md" />
            {/* Descripción */}
            <Skeleton className="h-4 w-full max-w-2xl mb-2 rounded-md" />
            <Skeleton className="h-4 w-5/6 max-w-2xl mb-2 rounded-md" />
            <Skeleton className="h-4 w-3/4 max-w-2xl rounded-md" />
        </div>
    );
};

export default AboutSkeleton;