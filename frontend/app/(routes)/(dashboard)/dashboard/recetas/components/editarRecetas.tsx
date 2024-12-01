"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Receta, Paso } from "@/types/receta";
import { editReceta } from "@/api/recetas/editRecetas";
import { PencilIcon } from "lucide-react";
import { deletePaso } from "@/api/recetas/deletePaso";

interface EditarRecetasProps {
    receta: Receta;
    onEditSuccess: (recetaEditada: Receta) => void;
}

const EditarRecetas: React.FC<EditarRecetasProps> = ({ receta, onEditSuccess }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [recetaEditada, setRecetaEditada] = useState<Receta>(receta);
    const [error, setError] = useState<string | null>(null);
    const [pasosEliminados, setPasosEliminados] = useState<Paso[]>([]);

    const handleAgregarPaso = () => {
        const nuevoPaso: Paso = {
            numero: recetaEditada.pasos.length + 1,
            descripcion: "",
        };
        setRecetaEditada({
            ...recetaEditada,
            pasos: [...recetaEditada.pasos, nuevoPaso],
        });
    };

    const handleCambiarPaso = (index: number, descripcion: string) => {
        const pasosActualizados = [...recetaEditada.pasos];
        pasosActualizados[index].descripcion = descripcion;
        setRecetaEditada({ ...recetaEditada, pasos: pasosActualizados });
    };

    const handleEliminarPaso = (index: number) => {
        const pasoEliminado = recetaEditada.pasos[index];
        if (pasoEliminado.id) {
            setPasosEliminados([...pasosEliminados, pasoEliminado]);
        }

        const pasosActualizados = recetaEditada.pasos
            .filter((_, i) => i !== index)
            .map((paso, i) => ({ ...paso, numero: i + 1 }));

        setRecetaEditada({ ...recetaEditada, pasos: pasosActualizados });
    };

    const handleGuardar = async (event: React.FormEvent) => {
        event.preventDefault();

        // Eliminar pasos pendientes desde la API
        for (const paso of pasosEliminados) {
            if (paso.id) {
                const eliminado = await deletePaso(receta.id!, paso.id);
                if (!eliminado) {
                    setError(`Error al eliminar el paso ${paso.numero}`);
                    return;
                }
            }
        }

        // Actualizar receta con los pasos restantes
        const resultado = await editReceta(receta, recetaEditada);
        if (resultado) {
            onEditSuccess(recetaEditada);
            setIsOpen(false);
            setPasosEliminados([]);
        } else {
            console.error("Error al editar la receta");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <PencilIcon className="h-4 w-4 mr-2" />
                    <span>Editar</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Receta</DialogTitle>
                </DialogHeader>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleGuardar}>
                    <div className="space-y-4">
                        <Input
                            name="titulo"
                            placeholder="Título de la receta"
                            value={recetaEditada.titulo}
                            onChange={(e) =>
                                setRecetaEditada({ ...recetaEditada, titulo: e.target.value })
                            }
                            required
                        />
                        <Input
                            name="ingredientes"
                            placeholder="Ingredientes"
                            value={recetaEditada.ingredientes}
                            onChange={(e) =>
                                setRecetaEditada({
                                    ...recetaEditada,
                                    ingredientes: e.target.value,
                                })
                            }
                            required
                        />
                        <Input
                            name="imagen"
                            placeholder="URL de la imagen"
                            value={recetaEditada.imagen}
                            onChange={(e) =>
                                setRecetaEditada({ ...recetaEditada, imagen: e.target.value })
                            }
                            required
                        />
                        <div className="space-y-2">
                            {recetaEditada.pasos.map((paso, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <Input
                                        name={`paso-${index}`}
                                        placeholder={`Paso ${paso.numero}`}
                                        value={paso.descripcion}
                                        onChange={(e) =>
                                            handleCambiarPaso(index, e.target.value)
                                        }
                                        required
                                    />
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        type="button"
                                        onClick={() => handleEliminarPaso(index)}
                                    >
                                        Eliminar
                                    </Button>
                                </div>
                            ))}
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={handleAgregarPaso}
                            >
                                Agregar Paso
                            </Button>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Guardar Cambios</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditarRecetas;