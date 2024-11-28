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
import { addReceta } from "@/api/recetas/addRecetas";

const AgregarRecetas = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [nuevaReceta, setNuevaReceta] = useState<Receta>({
        titulo: "",
        ingredientes: "",
        imagen: "",
        pasos: [],
    });

    const handleAgregarPaso = () => {
        const nuevoPaso: Paso = {
            numero: nuevaReceta.pasos.length + 1,
            descripcion: "",
        };
        setNuevaReceta({
            ...nuevaReceta,
            pasos: [...nuevaReceta.pasos, nuevoPaso],
        });
    };

    const handleCambiarPaso = (index: number, descripcion: string) => {
        const pasosActualizados = [...nuevaReceta.pasos];
        pasosActualizados[index].descripcion = descripcion;
        setNuevaReceta({ ...nuevaReceta, pasos: pasosActualizados });
    };

    const handleEliminarPaso = (index: number) => {
        const pasosActualizados = nuevaReceta.pasos
            .filter((_, i) => i !== index)
            .map((paso, i) => ({ ...paso, numero: i + 1 }));
        setNuevaReceta({ ...nuevaReceta, pasos: pasosActualizados });
    };

    const handleGuardar = async (event: React.FormEvent) => {
        event.preventDefault();
        const resultado = await addReceta(nuevaReceta);
        if (resultado) {
            alert("Receta agregada correctamente");
            setNuevaReceta({
                titulo: "",
                ingredientes: "",
                imagen: "",
                pasos: [],
            });
            setIsOpen(false);
        } else {
            setError("Error al agregar la receta");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar Receta</DialogTitle>
                </DialogHeader>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleGuardar}>
                    <div className="space-y-4">
                        <Input
                            name="titulo"
                            placeholder="Título de la receta"
                            value={nuevaReceta.titulo}
                            onChange={(e) =>
                                setNuevaReceta({ ...nuevaReceta, titulo: e.target.value })
                            }
                        />
                        <Input
                            name="ingredientes"
                            placeholder="Lista de ingredientes"
                            value={nuevaReceta.ingredientes}
                            onChange={(e) =>
                                setNuevaReceta({
                                    ...nuevaReceta,
                                    ingredientes: e.target.value,
                                })
                            }
                        />
                        <Input
                            name="imagen"
                            placeholder="URL de la imagen"
                            value={nuevaReceta.imagen}
                            onChange={(e) =>
                                setNuevaReceta({ ...nuevaReceta, imagen: e.target.value })
                            }
                        />
                        <div className="space-y-2">
                            {nuevaReceta.pasos.map((paso, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <Input
                                        name={`paso-${index}`}
                                        placeholder={`Paso ${paso.numero}`}
                                        value={paso.descripcion}
                                        onChange={(e) =>
                                            handleCambiarPaso(index, e.target.value)
                                        }
                                    />
                                    <Button
                                        variant="destructive"
                                        size="sm"
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
                        <Button type="submit">Guardar Receta</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AgregarRecetas;