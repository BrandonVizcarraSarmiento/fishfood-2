import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/clientes/navbar";
import Redes from "@/components/clientes/redes";
import Footer from "@/components/clientes/footer";

const ProductosSkeleton = () => {
    return (
        <div>
            <Navbar />
            <Redes />
            <section className="flex flex-col items-center p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl w-full">
                    {/* Producto destacado grande */}
                    <div className="col-span-1 md:col-span-2 flex justify-center items-center h-full">
                        <Skeleton className="w-full h-[785px] rounded-lg" />
                    </div>
                    {/* Productos secundarios */}
                    <div className="col-span-1 flex flex-col justify-between space-y-4">
                        <Skeleton className="w-full h-[380px] rounded-lg" />
                        <Skeleton className="w-full h-[380px] rounded-lg" />
                    </div>
                </div>
            </section>
            <section className="flex justify-center p-4">
                {/* Slider simulado con elementos cuadrados más grandes */}
                <div className="flex gap-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="w-[350px] h-[350px] rounded-lg"
                        />
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default ProductosSkeleton;