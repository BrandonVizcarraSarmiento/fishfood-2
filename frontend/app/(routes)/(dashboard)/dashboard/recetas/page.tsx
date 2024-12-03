"use client"
import { useGetRecetas } from "@/api/recetas/getRecetas";
import AgregarReceta from "./components/agregarRecetas";
import TablaReceta from "./components/tablaRecetas";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Receta } from "@/types/receta";
import { useState, useEffect } from "react";

const SeccionRecetas = () => {
    const { recetas: fetchedRecetas, loading, error, refetch } = useGetRecetas();
    const [recetas, setRecetas] = useState<Receta[]>([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        if (fetchedRecetas) {
            setRecetas(fetchedRecetas);
        }
    }, [fetchedRecetas]);

    const mostrarToast = (mensaje: string) => {
        setToastMessage(mensaje);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
            setToastMessage(null);
        }, 3000);
    };

    const handleSaveReceta = async (receta: Receta) => {
        try {
            mostrarToast("Agregando receta...");
            await refetch(); // Refresca la lista desde la API
            mostrarToast("Se agregó una nueva receta.");
        } catch (error) {
            mostrarToast("Error al agregar la receta.");
        }
    };

    if (loading) {
        return <div>Cargando recetas...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-4">
            {showToast && toastMessage && (
                <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded shadow-lg">
                    {toastMessage}
                </div>
            )}

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Gestión de Recetas</h1>
                <AgregarReceta recetas={recetas} onSave={handleSaveReceta}>
                    <Button>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Agregar Receta
                    </Button>
                </AgregarReceta>
            </div>

            <TablaReceta recetas={recetas} setRecetas={setRecetas} />
        </div>
    );
};

export default SeccionRecetas;