"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditBeneficioTab from "../../components/editBeneficioTab";
import { ToastProvider } from "@/components/ui/toast";
import { useGetBeneficios } from "@/api/beneficios/getBeneficios";
import { editBeneficio } from "@/api/beneficios/editBenefecios";
import { Beneficios } from "@/types/beneficios";

const EditBeneficio = () => {
  const { beneficios, loading, error } = useGetBeneficios();
  const [editedBeneficios, setEditedBeneficios] = useState<Beneficios[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (beneficios.length > 0) {
      setEditedBeneficios(beneficios);
    }
  }, [beneficios]);

  const handleChange = (index: number, field: keyof Beneficios, value: string) => {
    const updatedBeneficios = [...editedBeneficios];
    updatedBeneficios[index] = { ...updatedBeneficios[index], [field]: value };
    setEditedBeneficios(updatedBeneficios);
  };

  const handleSubmit = async (index: number) => {
    try {
      const updatedBeneficio = editedBeneficios[index];
      await editBeneficio(updatedBeneficio.id, updatedBeneficio);
      setToastMessage(`Beneficio ${index + 1} actualizado con éxito`);
    } catch (error) {
      console.error(error);
      setToastMessage(`Error al actualizar el beneficio ${index + 1}`);
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ToastProvider>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Editar Beneficios</h2>
        <Tabs>
          <TabsList>
            {editedBeneficios.map((_, index) => (
              <TabsTrigger key={index} value={`beneficio-${index}`}>
                Beneficio {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>

          {editedBeneficios.map((beneficio, index) => (
            <TabsContent key={index} value={`beneficio-${index}`}>
              <EditBeneficioTab
                index={index}
                beneficio={beneficio}
                handleChange={handleChange}
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

export default EditBeneficio;