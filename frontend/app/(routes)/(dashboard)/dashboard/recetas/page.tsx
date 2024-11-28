"use client";

import { Button } from "@/components/ui/button";
import TablaRecetas from "./components/tablaRecetas";
import AgregarRecetas from "./components/agregarRecetas";

const SeccionRecetas = () => {
    return (
        <div className="p-4">
            {/* Título y botón para agregar recetas */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Gestión de Recetas</h1>
                <AgregarRecetas>
                    <Button>Agregar Receta</Button>
                </AgregarRecetas>
            </div>

            {/* Tabla con las recetas */}
            <TablaRecetas />
        </div>
    );
};

export default SeccionRecetas;