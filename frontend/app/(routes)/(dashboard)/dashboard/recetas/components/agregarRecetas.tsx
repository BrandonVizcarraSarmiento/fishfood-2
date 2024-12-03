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

interface AgregarRecetaProps {
    recetas: Receta[];
    onSave: (receta: Receta) => void;
    children: React.ReactNode;
}

const AgregarReceta: React.FC<AgregarRecetaProps> = ({ recetas, onSave, children }) => {
    const [formData, setFormData] = useState({
        titulo: "",
        ingredientes: "",
        imagen: "",
    });
    const [pasos, setPasos] = useState<Paso[]>([]);
    const [newPaso, setNewPaso] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const getNextId = () => {
        return recetas.length === 0 ? 1 : Math.max(...recetas.map((r) => r.id || 0)) + 1;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddPaso = () => {
        if (!newPaso.trim()) return;
        const numero = pasos.length + 1;
        // No asignar un id aquí, Prisma lo gestionará automáticamente
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
        const updatedPasos = pasos.filter((_, i) => i !== index).map((paso, i) => ({ ...paso, numero: i + 1 }));
        setPasos(updatedPasos);
    };

    const handleSave = async () => {
        const { titulo, ingredientes, imagen } = formData;

        if (!titulo || !ingredientes || !imagen || pasos.length === 0) {
            setError("Todos los campos y al menos un paso son obligatorios.");
            return;
        }

        const nuevaReceta: Receta = {
            id: getNextId(),
            titulo,
            ingredientes,
            imagen,
            pasos,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const success = await addReceta(nuevaReceta);

        if (success) {
            onSave(nuevaReceta);
            resetForm();
            setIsOpen(false);
        } else {
            setError("Error al agregar la receta.");
        }
    };

    const resetForm = () => {
        setFormData({
            titulo: "",
            ingredientes: "",
            imagen: "",
        });
        setPasos([]);
        setError(null);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar Receta</DialogTitle>
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
                                {pasos.map((paso, index) => (
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
                    <Button onClick={handleSave}>Guardar receta</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AgregarReceta;