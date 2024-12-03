import React, { useState, useEffect } from "react";
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
import { deletePaso } from "@/api/recetas/deletePaso";

interface EditarRecetaProps {
    receta: Receta;
    onUpdate: (receta: Receta) => void;
    children: React.ReactNode;
}

const EditarReceta: React.FC<EditarRecetaProps> = ({ receta, onUpdate, children }) => {
    const [formData, setFormData] = useState({
        titulo: "",
        ingredientes: "",
        imagen: "",
    });
    const [pasos, setPasos] = useState<Paso[]>([]);
    const [newPaso, setNewPaso] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [deletedPasos, setDeletedPasos] = useState<number[]>([]);

    useEffect(() => {
        if (receta) {
            setFormData({
                titulo: receta.titulo,
                ingredientes: receta.ingredientes,
                imagen: receta.imagen,
            });
            setPasos(receta.pasos || []);
        }
    }, [receta]);
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddPaso = () => {
        if (!newPaso.trim()) return;
        const numero = pasos.length + 1;
        setPasos([...pasos, { numero, descripcion: newPaso }]);
        setNewPaso("");
    };

    const handleEditPaso = (index: number, descripcion: string) => {
        const updatedPasos = pasos.map((paso, i) =>
            i === index ? { ...paso, descripcion } : paso
        );
        setPasos(updatedPasos);
    };

    const handleDeletePaso = (index: number) => {
        const pasoToDelete = pasos[index];
        if (pasoToDelete.id) { // Asegúrate de que el paso tenga un ID antes de marcarlo para eliminación.
            setDeletedPasos([...deletedPasos, pasoToDelete.id]);
        }
        const updatedPasos = pasos
            .filter((_, i) => i !== index)
            .map((paso, i) => ({ ...paso, numero: i + 1 }));
        setPasos(updatedPasos);
    };    

    const handleSave = async () => {
        const { titulo, ingredientes, imagen } = formData;
    
        if (!titulo || !ingredientes || !imagen || pasos.length === 0) {
            setError("Todos los campos y al menos un paso son obligatorios.");
            return;
        }
    
        const updatedReceta: Receta = {
            ...receta,
            titulo,
            ingredientes,
            imagen,
            pasos,
            updatedAt: new Date().toISOString(),
        };
    
        if (!receta.id) {
            setError("La receta no tiene un ID válido.");
            return;
        }
    
        try {
            // Elimina los pasos marcados en el backend
            for (const pasoId of deletedPasos) {
                const success = await deletePaso(receta.id, pasoId);
                if (!success) {
                    setError(`No se pudo eliminar el paso con ID ${pasoId}`);
                    return;
                }
            }
    
            // Edita la receta con los pasos actualizados
            const result = await editReceta(receta, updatedReceta);
            onUpdate(result);
            setIsOpen(false);
        } catch (error) {
            setError("Error al actualizar la receta.");
        }
    };
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Receta</DialogTitle>
                </DialogHeader>
                {error && <p className="text-red-500">{error}</p>}
                <form>
                    <div className="space-y-4">
                        <Input
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleInputChange}
                            placeholder="Título de la receta"
                        />
                        <Input
                            name="ingredientes"
                            value={formData.ingredientes}
                            onChange={handleInputChange}
                            placeholder="Ingredientes"
                        />
                        <Input
                            name="imagen"
                            value={formData.imagen}
                            onChange={handleInputChange}
                            placeholder="URL de la imagen"
                        />
                        <div>
                            <label className="block mb-2">Pasos:</label>
                            <div className="flex items-center space-x-2">
                                <Input
                                    value={newPaso}
                                    onChange={(e) => setNewPaso(e.target.value)}
                                    placeholder="Añadir paso"
                                />
                                <Button type="button" onClick={handleAddPaso}>Añadir</Button>
                            </div>
                            <ul className="mt-2 space-y-2">
                                {(pasos || []).map((paso, index) => (
                                    <li key={index} className="flex items-center space-x-4">
                                        <Input
                                            value={paso.descripcion}
                                            onChange={(e) => handleEditPaso(index, e.target.value)}
                                            className="flex-1"
                                        />
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDeletePaso(index)}
                                            type="button"
                                        >
                                            Eliminar
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </form>
                <DialogFooter>
                    <Button onClick={handleSave}>Guardar cambios</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditarReceta;