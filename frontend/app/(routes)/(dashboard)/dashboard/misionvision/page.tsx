"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditSection from "../../components/editMision";
import { ToastProvider } from "@/components/ui/toast";
import { editMision } from "@/api/mision/editMision";
import { Mision } from "@/types/mision";
import { useGetMision } from "@/api/mision/getMision";

type SectionData = {
  texto: string;
  imagen: string;
  id: number;
};

type MisionVisionData = {
  mision: SectionData;
  vision: SectionData;
  valores: SectionData;
};

const EditMisionVision = () => {
  const { misiones, loading, error } = useGetMision();
  const [data, setData] = useState<MisionVisionData>({
    mision: { texto: "", imagen: "", id: 0 },
    vision: { texto: "", imagen: "", id: 0 },
    valores: { texto: "", imagen: "", id: 0 },
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!loading && misiones.length > 0) {
      setData({
        mision: { texto: misiones[0].descripcion, imagen: misiones[0].imgLink, id: misiones[0].id },
        vision: { texto: misiones[1].descripcion, imagen: misiones[1].imgLink, id: misiones[1].id },
        valores: { texto: misiones[2].descripcion, imagen: misiones[2].imgLink, id: misiones[2].id },
      });
    }
  }, [misiones, loading]);

  const handleTextChange = (section: "mision" | "vision" | "valores", value: string) => {
    setData({ ...data, [section]: { ...data[section], texto: value } });
  };

  const handleImageLinkChange = (section: "mision" | "vision" | "valores", value: string) => {
    setData({ ...data, [section]: { ...data[section], imagen: value } });
  };

  const handleSubmit = async (section: "mision" | "vision" | "valores") => {
    const updatedSection = data[section];
    try {
      const updatedMision: Mision = {
        id: updatedSection.id,
        descripcion: updatedSection.texto,
        imgLink: updatedSection.imagen,
      };

      // Llamamos a la API para actualizar la sección específica
      const result = await editMision(updatedMision);
      setToastMessage(`Sección ${section} actualizada con éxito`);
    } catch (error) {
      console.error(error);
      setToastMessage(`Error al actualizar la sección ${section}`);
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <ToastProvider>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Editar Misión, Visión y Valores</h2>
        <Tabs>
          <TabsList>
            <TabsTrigger value="mision">Misión</TabsTrigger>
            <TabsTrigger value="vision">Visión</TabsTrigger>
            <TabsTrigger value="valores">Valores</TabsTrigger>
          </TabsList>

          <TabsContent value="mision">
            <EditSection
              sectionName="Misión"
              sectionData={data.mision}
              handleTextChange={(value) => handleTextChange("mision", value)}
              handleImageLinkChange={(value) => handleImageLinkChange("mision", value)}
              handleSubmit={() => handleSubmit("mision")}
            />
          </TabsContent>

          <TabsContent value="vision">
            <EditSection
              sectionName="Visión"
              sectionData={data.vision}
              handleTextChange={(value) => handleTextChange("vision", value)}
              handleImageLinkChange={(value) => handleImageLinkChange("vision", value)}
              handleSubmit={() => handleSubmit("vision")}
            />
          </TabsContent>

          <TabsContent value="valores">
            <EditSection
              sectionName="Valores"
              sectionData={data.valores}
              handleTextChange={(value) => handleTextChange("valores", value)}
              handleImageLinkChange={(value) => handleImageLinkChange("valores", value)}
              handleSubmit={() => handleSubmit("valores")}
            />
          </TabsContent>
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

export default EditMisionVision;
