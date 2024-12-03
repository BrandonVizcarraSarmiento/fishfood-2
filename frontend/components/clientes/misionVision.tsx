"use client";
 
import { useInView } from "react-intersection-observer";
import { useGetMision } from "@/api/mision/getMision";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Mision } from "@/types/mision";
import MisionVisionSkeleton from "../skeleton/misionVisionSkeleton";
 
const MisionVision = () => {
    const { misiones, loading, error } = useGetMision();
    const { ref, inView } = useInView({
        triggerOnce: true, // Solo dispara la animación la primera vez que el elemento entra en vista
        threshold: 0.5, // Puedes ajustar el umbral según lo que necesites
    });
 
    if (loading) return <MisionVisionSkeleton />;
    if (error) return <p>Error: {error}</p>;
 
    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <div
                ref={ref}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 justify-items-center my-20"
            >
                {misiones.map((mision: Mision, index: number) => (
                    <Card
                        key={mision.id}
                        className={`flex flex-col items-center text-center space-y-2 hover:border-primary transition-all duration-1000 ease-out bg-slate-200 dark:bg-slate-950 transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    >
                        <CardContent>
                            <img
                                src={mision.imgLink}
                                width={300}
                                height={300}
                                alt={`imagen de ${index === 0 ? 'misión' : index === 1 ? 'visión' : 'valores'}`}
                                className="h-64 w-64 mx-auto"
                            />
                        </CardContent>
                        <CardFooter className="max-w-sm mx-auto">
                            <p className="text-sm text-justify">
                                {mision.descripcion}
                            </p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};
 
export default MisionVision;