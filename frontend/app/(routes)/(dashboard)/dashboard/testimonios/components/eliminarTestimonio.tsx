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
import { deleteTestimonio } from "@/api/testimonio/deleteTestimonio";

interface EliminarTestimonioProps {
  id: number;
  onDelete: (id: number) => void;
}

const EliminarTestimonio: React.FC<EliminarTestimonioProps> = ({ id, onDelete }) => {
  const eliminarTestimonio = async () => {
    const success = await deleteTestimonio(id);

    if (success) {
      onDelete(id);
    } else {
      console.error("Error al eliminar el testimonio.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full sm:w-auto">
          <TrashIcon className="h-4 w-4 mr-2" />
          Eliminar
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Deseas eliminar este testimonio?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no podrá deshacerse.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={eliminarTestimonio}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EliminarTestimonio;