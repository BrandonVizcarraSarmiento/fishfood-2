import { Skeleton } from "@/components/ui/skeleton";

const ImgProductoSkeleton = () => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <Skeleton className="w-full h-full rounded-md" />
        </div>
    );
};

export default ImgProductoSkeleton;