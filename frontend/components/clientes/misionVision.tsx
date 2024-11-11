"use client";

import { useGetMision } from "@/api/mision/getMision";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Mision } from "@/types/mision";

const MisionVision = () => {
    const { misiones, loading, error } = useGetMision();

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 justify-items-center my-20">
                {misiones.map((mision: Mision, index: number) => (
                    <Card key={mision.id} className="flex flex-col items-center text-center space-y-2 hover:border-primary transition-colors duration-300 bg-slate-200 dark:bg-slate-950">
                        <CardContent>
                            <img src={mision.imgLink} width={300} height={300} alt={`imagen de ${index === 0 ? 'misión' : index === 1 ? 'visión' : 'valores'}`} className="h-64 w-64 mx-auto" />
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