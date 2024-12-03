import React from "react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { TrashIcon } from "lucide-react";
import { deleteReceta } from "@/api/recetas/deleteRecetas";

interface EliminarRecetaProps {
    id: number;
    onDelete: (id: number) => void;
}

const EliminarReceta: React.FC<EliminarRecetaProps> = ({ id, onDelete }) => {
    const eliminarReceta = async () => {
        const success = await deleteReceta(id);

        if (success) {
            onDelete(id);
        } else {
            console.error("Error al eliminar la receta.");
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                    <TrashIcon className="h-4 w-4 mr-2" />
                    <span>Eliminar</span>
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Deseas eliminar esta receta?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no podrá deshacerse.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={eliminarReceta}>Eliminar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default EliminarReceta;