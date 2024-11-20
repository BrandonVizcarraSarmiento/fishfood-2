import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/clientes/navbar";
import Redes from "@/components/clientes/redes";
import Footer from "@/components/clientes/footer";

const NovedadesSkeleton = () => {
    return (
        <div>
            <Navbar />
            <Redes />
            <section className="flex flex-col items-center p-4">
                <div className="flex justify-center items-center w-full max-w-7xl">
                    {/* Novedad destacada grande */}
                    <Skeleton className="w-full h-[785px] rounded-lg" />
                </div>
            </section>
            <section className="max-w-6xl mx-auto p-4">
                {/* Grid para los skeletons del slider */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="w-[280px] sm:w-[350px] h-[280px] sm:h-[350px] rounded-lg"
                        />
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default NovedadesSkeleton;
