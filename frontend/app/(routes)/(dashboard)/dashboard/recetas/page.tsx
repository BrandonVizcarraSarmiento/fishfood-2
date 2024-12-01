"use client";

import { Button } from "@/components/ui/button";
import TablaRecetas from "./components/tablaRecetas";
import AgregarRecetas from "./components/agregarRecetas";
import { useGetRecetas } from "@/api/recetas/getRecetas";
import { useEffect, useState } from "react";
import { Receta } from "@/types/receta";

const SeccionRecetas = () => {
    const { recetas, loading, error } = useGetRecetas();
    const [recetasActuales, setRecetasActuales] = useState<Receta[]>([]);

    useEffect(() => {
        if (recetas) {
            setRecetasActuales(recetas); // Actualiza las recetas desde la API
        }
    }, [recetas]);

    const agregarReceta = (nuevaReceta: Receta) => {
        // Agrega la receta de forma optimista
        setRecetasActuales((prevRecetas) => [...prevRecetas, nuevaReceta]);
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Gestión de Recetas</h1>
                <AgregarRecetas onAgregar={agregarReceta}>
                    <Button>Agregar Receta</Button>
                </AgregarRecetas>
            </div>
            <TablaRecetas recetas={recetasActuales} />
        </div>
    );
};

export default SeccionRecetas;