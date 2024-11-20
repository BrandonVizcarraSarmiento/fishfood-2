import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const InfoProductoSkeleton = () => {
    return (
        <div className="space-y-4 p-4">
            {/* Nombre del producto */}
            <div className="text-center space-y-4">
                <Skeleton className="h-8 w-2/3 mx-auto rounded-md" />
            </div>

            {/* Precio del producto */}
            <div className="space-y-2 flex justify-center">
                <Skeleton className="h-8 w-24 rounded-full" />
            </div>

            <Separator />

            {/* Descripción */}
            <div>
                <Skeleton className="h-6 w-1/2 mb-2 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-2/3 rounded-md" />
            </div>

            <Separator />

            {/* Botón de contacto */}
            <div className="flex justify-center mt-4">
                <Skeleton className="h-10 w-40 rounded-md" />
            </div>
        </div>
    );
};

export default InfoProductoSkeleton;