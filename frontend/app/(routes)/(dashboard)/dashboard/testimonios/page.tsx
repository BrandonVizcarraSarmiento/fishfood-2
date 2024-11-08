"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditSectionTestimonio from "../../components/editTestimonioTab";
import { ToastProvider } from "@/components/ui/toast";
import { useGetTestimonios } from "@/api/testimonio/getTestimonio";
import { editTestimonio } from "@/api/testimonio/editTestimonio";
import { Testimonio } from "@/types/testimonios";

const EditTestimonio = () => {
  const [editedTestimonios, setEditedTestimonios] = useState<Testimonio[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const { testimonios, loading, error } = useGetTestimonios();

  useEffect(() => {
    if (testimonios) {
      setEditedTestimonios(testimonios);
    }
  }, [testimonios]);

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
    try {
      await editTestimonio(updatedTestimonio.id, updatedTestimonio);
      setToastMessage("Testimonio actualizado con éxito");
      setShowToast(true);
    } catch (error) {
      setToastMessage("Error al actualizar el testimonio");
      setShowToast(true);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ToastProvider>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Editar Testimonios</h2>
        <Tabs>
          <TabsList>
            {editedTestimonios.map((_, index) => (
              <TabsTrigger key={index} value={`testimonio-${index}`}>
                {`Testimonio ${index + 1}`}
              </TabsTrigger>
            ))}
          </TabsList>

          {editedTestimonios.map((testimonio, index) => (
            <TabsContent key={index} value={`testimonio-${index}`}>
              <EditSectionTestimonio
                sectionName={`Testimonio ${index + 1}`}
                sectionData={testimonio}
                previewImage={testimonio.imgLink}
                handleTextChange={(field, value) => handleTextChange(index, field, value)}
                handleImageLinkChange={(e) => handleImageLinkChange(index, e.target.value)}
                handleSubmit={() => handleSubmit(index)}
              />
            </TabsContent>
          ))}
        </Tabs>

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

export default EditTestimonio;
