import { Skeleton } from "@/components/ui/skeleton";

const BeneficiosSkeleton = () => {
    return (
        <div className="flex flex-col items-center my-20 p-4">
            <h2 className="text-center font-bold text-3xl mb-6">Beneficios</h2>
            <div className="w-full max-w-6xl">
                {/* Skeleton para la lista de beneficios */}
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="mb-4">
                        <Skeleton className="h-6 w-full mb-2" />
                        <Skeleton className="h-6 w-3/4" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BeneficiosSkeleton;