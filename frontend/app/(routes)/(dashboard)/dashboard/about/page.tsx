"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditAboutTab from "../../components/editAboutTab";
import EditSection from "../../components/EditSection";
import { ToastProvider } from "@/components/ui/toast";
import { About } from "@/types/about"; // Asegúrate de importar los tipos
import { secciones } from "@/types/secciones";

const EditAbout = () => {
  const [aboutData, setAboutData] = useState<About | null>(null);
  const [seccionesData, setSeccionesData] = useState<secciones[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Cargar los datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const aboutResponse = await fetch("/api/about");
        const about = await aboutResponse.json();
        setAboutData(about);

        const seccionesResponse = await fetch("/api/secciones");
        const secciones = await seccionesResponse.json();
        setSeccionesData(secciones);
      } catch (error) {
        setToastMessage("Error al cargar los datos.");
        setShowToast(true);
      }
    };

    fetchData();
  }, []);

  // Manejar cambios de texto (About y Secciones)
  const handleTextChange = (field: keyof About | keyof Secciones, value: string) => {
    if (field === "descripcion" && aboutData) {
      setAboutData({ ...aboutData, descripcion: value });
    } else if (field === "descripcion" && seccionesData) {
      const updatedSecciones = seccionesData.map((section) => 
        section.id === field ? { ...section, descripcion: value } : section
      );
      setSeccionesData(updatedSecciones);
    }
  };

  // Manejar la actualización de About y Secciones
  const handleSubmit = async (type: "quienesSomos" | "seccion1" | "seccion2") => {
    try {
      let response;
      if (type === "quienesSomos" && aboutData) {
        response = await fetch(`/api/about/${aboutData.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(aboutData),
        });
      } else {
        const section = seccionesData.find((s) => s.id === type);
        if (section) {
          response = await fetch(`/api/secciones/${section.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(section),
          });
        }
      }
      if (!response.ok) {
        throw new Error("Error al guardar los cambios.");
      }
      setToastMessage("Cambios guardados con éxito.");
      setShowToast(true);
    } catch (error) {
      setToastMessage("Error al guardar los cambios.");
      setShowToast(true);
    }
  };

  return (
    <ToastProvider>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Editar Quienes Somos</h2>
        <Tabs>
          <TabsList>
            <TabsTrigger value="quienesSomos">Quienes Somos</TabsTrigger>
            <TabsTrigger value="seccion1">Sección 1</TabsTrigger>
            <TabsTrigger value="seccion2">Sección 2</TabsTrigger>
          </TabsList>
          <TabsContent value="quienesSomos">
            {aboutData && (
              <EditAboutTab
                aboutData={aboutData}
                handleTextChange={(texto) => handleTextChange("descripcion", texto)}
                handleSubmit={() => handleSubmit("quienesSomos")}
              />
            )}
          </TabsContent>
          <TabsContent value="seccion1">
            {seccionesData.length > 0 && (
              <EditSection
                sectionName="Sección 1"
                sectionData={seccionesData[0]}
                previewImage={seccionesData[0].imglink}
                handleTextChange={(texto) => handleTextChange("descripcion", texto)}
                handleImageLinkChange={(url) => handleTextChange("imglink", url)}
                handleSubmit={() => handleSubmit("seccion1")}
              />
            )}
          </TabsContent>
          <TabsContent value="seccion2">
            {seccionesData.length > 1 && (
              <EditSection
                sectionName="Sección 2"
                sectionData={seccionesData[1]}
                previewImage={seccionesData[1].imglink}
                handleTextChange={(texto) => handleTextChange("descripcion", texto)}
                handleImageLinkChange={(url) => handleTextChange("imglink", url)}
                handleSubmit={() => handleSubmit("seccion2")}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>

      {showToast && toastMessage && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded shadow-lg">
          {toastMessage}
        </div>
      )}
    </ToastProvider>
  );
};

export default EditAbout;