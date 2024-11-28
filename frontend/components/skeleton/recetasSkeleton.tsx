import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/clientes/navbar";
import Redes from "@/components/clientes/redes";
import Footer from "@/components/clientes/footer";
import { Card, CardHeader } from "../ui/card";

const RecetasSkeleton = () => {
    return (
        <>
            <Navbar />
            <Redes />
            <section className="my-16">
                <div className="p-4 mx-10 sm:mx-10 md:mx-12 lg:mx-20 xl:mx-28">
                    <h1 className="text-2xl font-bold mb-4">Recetas</h1>
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="shadow-md hover:shadow-lg transition">
                                <CardHeader>
                                    <Skeleton className="h-6 w-2/3" />
                                </CardHeader>
                                <div>
                                    <Skeleton className="w-full h-64" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default RecetasSkeleton;