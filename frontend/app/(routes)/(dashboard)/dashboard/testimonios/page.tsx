"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditSectionTestimonio from "./components/editTestimonioTab";
import { ToastProvider } from "@/components/ui/toast";
import { useGetTestimonios } from "@/api/testimonio/getTestimonio";
import { editTestimonio } from "@/api/testimonio/editTestimonio";
import { Testimonio } from "@/types/testimonios";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { addTestimonio } from "@/api/testimonio/addTestimonio";
import AgregarTestimonio from "./components/agregarTestimonio";

const PageTestimonio = () => {
  const [editedTestimonios, setEditedTestimonios] = useState<Testimonio[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const { testimonios, loading, error } = useGetTestimonios();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTestimonio, setNewTestimonio] = useState<Testimonio | null>(null);

  useEffect(() => {
    if (testimonios) {
      setEditedTestimonios(testimonios);
    }
  }, [testimonios]);

  useEffect(() => {
    if (showToast) {
      const timeout = setTimeout(() => {
        setShowToast(false);
        setToastMessage(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [showToast]);

  const handleTextChange = (index: number, field: keyof Testimonio, value: string) => {
    setEditedTestimonios((prevState) =>
      prevState.map((testimonio, idx) =>
        idx === index ? { ...testimonio, [field]: value } : testimonio
      )
    );
  };

  const handleImageLinkChange = (index: number, value: string) => {
    setEditedTestimonios((prevState) =>
      prevState.map((testimonio, idx) =>
        idx === index ? { ...testimonio, imgLink: value } : testimonio
      )
    );
  };

  const handleSubmit = async (index: number) => {
    const updatedTestimonio = editedTestimonios[index];

    if (updatedTestimonio.id !== undefined) {
      try {
        await editTestimonio(updatedTestimonio.id, updatedTestimonio);
        setToastMessage("Testimonio actualizado con éxito");
        setShowToast(true);
      } catch (error) {
        setToastMessage("Error al actualizar el testimonio");
        setShowToast(true);
      }
    } else {
      setToastMessage("El testimonio no tiene ID válido.");
      setShowToast(true);
    }
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setNewTestimonio(null);
  };

  const handleNewTestimonioSubmit = async (testimonio: Testimonio) => {
    const success = await addTestimonio(testimonio);
    if (success) {
      setToastMessage("Testimonio agregado con éxito");
      setShowToast(true);
      setIsDialogOpen(false);
    } else {
      setToastMessage("Error al agregar el testimonio");
      setShowToast(true);
    }
  };

  const handleDelete = (id: number) => {
    setEditedTestimonios((prevState) =>
      prevState.filter((testimonio) => testimonio.id !== id)
    );
    setToastMessage("Testimonio eliminado con éxito");
    setShowToast(true);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ToastProvider>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Editar Testimonios</h2>
        <div className="mb-4">
          <Tabs>
            <div className="flex items-center justify-between mb-4">
              <div className="overflow-x-auto flex-grow">
                <TabsList className="flex space-x-2">
                  {editedTestimonios.map((_, index) => (
                    <TabsTrigger key={index} value={`testimonio-${index}`} className="whitespace-nowrap">
                      {`Testimonio ${index + 1}`}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <Button onClick={handleDialogOpen} className="ml-4">
                Agregar Testimonio
              </Button>
            </div>
            {editedTestimonios.map((testimonio, index) => (
              <TabsContent key={index} value={`testimonio-${index}`}>
                <EditSectionTestimonio
                  sectionName={`Testimonio ${index + 1}`}
                  sectionData={testimonio}
                  previewImage={testimonio.imgLink}
                  handleTextChange={(field, value) => handleTextChange(index, field, value)}
                  handleImageLinkChange={(e) => handleImageLinkChange(index, e.target.value)}
                  handleSubmit={() => handleSubmit(index)}
                  handleDelete={handleDelete}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Modal de Agregar Testimonio */}
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogContent>
            <AgregarTestimonio onSubmit={handleNewTestimonioSubmit} />
          </DialogContent>
        </Dialog>

        {/* Componente Toast */}
        {showToast && toastMessage && (
          <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded shadow-lg">
            {toastMessage}
          </div>
        )}
      </div>
    </ToastProvider>
  );
};

export default PageTestimonio;