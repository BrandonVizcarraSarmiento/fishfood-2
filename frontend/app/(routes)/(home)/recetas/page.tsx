"use client";

import { useState, useEffect } from "react";
import { useGetRecetas } from "@/api/recetas/getRecetas";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Footer from "@/components/clientes/footer";
import Navbar from "@/components/clientes/navbar";
import Redes from "@/components/clientes/redes";

const SeccionRecetas = () => {
    const { recetas, loading, error } = useGetRecetas();
    const [recetasFiltradas, setRecetasFiltradas] = useState(recetas || []);
    const [recetaSeleccionada, setRecetaSeleccionada] = useState<null | any>(null);

    useEffect(() => {
        if (recetas) {
            setRecetasFiltradas(recetas);
        }
    }, [recetas]);

    const cerrarReceta = () => {
        setRecetaSeleccionada(null);
    };

    if (loading) return <p>Cargando recetas...</p>;
    if (error) return <p>Error al cargar recetas: {error}</p>;

    return (
        <>
            <Navbar />
            <Redes />
            <section>
                <div className="p-4 mx-20 mb-10">
                    <h1 className="text-2xl font-bold mb-4">Recetas</h1>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {recetasFiltradas.map((receta) => (
                            <Card
                                key={receta.id}
                                className="shadow-md hover:shadow-lg transition"
                                onClick={() => setRecetaSeleccionada(receta)}
                            >
                                <CardHeader>
                                    <CardTitle>{receta.titulo}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <img
                                        src={receta.imagen}
                                        alt={receta.titulo}
                                        className="w-full h-48 object-cover mb-2"
                                    />
                                </CardContent>
                                <CardContent>
                                    <p><strong>Ingredientes:</strong> {receta.ingredientes}</p>
                                </CardContent>
                                <CardContent>
                                    <p><strong>Pasos:</strong></p>
                                    <ol className="list-decimal pl-5">
                                        {receta.pasos.map((paso) => (
                                            <li key={paso.id}>{paso.descripcion}</li>
                                        ))}
                                    </ol>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {recetaSeleccionada && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-gray-800 text-white p-6 rounded-lg w-full sm:w-4/5 md:w-3/5 lg:w-2/3 xl:w-1/2 relative transition-transform transform scale-105">
                        <button
                            onClick={cerrarReceta}
                            className="absolute top-2 right-2 text-2xl text-red-500"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-4">{recetaSeleccionada.titulo}</h2>

                        <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
                            <div className="w-full md:w-1/3">
                                <img
                                    src={recetaSeleccionada.imagen}
                                    alt={recetaSeleccionada.titulo}
                                    className="w-full h-64 object-cover mb-4 rounded-lg"
                                />
                            </div>
                            <div className="w-full md:w-2/3">
                                <div className="space-y-2">
                                    <p><strong>Ingredientes:</strong></p>
                                    <p>{recetaSeleccionada.ingredientes}</p>
                                </div>
                                <div className="space-y-2 mt-4">
                                    <p><strong>Pasos:</strong></p>
                                    <ol className="list-decimal pl-5">
                                        {recetaSeleccionada.pasos.map((paso: any) => (
                                            <li key={paso.id}>{paso.descripcion}</li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default SeccionRecetas;