"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToastProvider } from "@/components/ui/toast";
import EditAboutTab from "../../components/editAboutTab";
import EditSecciones from "../../components/editSecciones";
import { useGetAbout } from "@/api/about/getAbout";
import { useGetSecciones } from "@/api/secciones/getSecciones";
import { editAbout } from "@/api/about/editAbout";
import { editSeccion } from "@/api/secciones/editSecciones";
import { About } from "@/types/about";

const EditAbout = () => {
  const { about: initialAbout, loading: loadingAbout, error: errorAbout } = useGetAbout();
  const { seccionesData: initialSeccionesData, loading: loadingSecciones, error: errorSecciones } = useGetSecciones();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Estado local para mantener `about` con tipo `About`
  const [about, setAbout] = useState<About>(initialAbout || { id: 0, descripcion: "" });
  const [seccionesData, setSeccionesData] = useState(initialSeccionesData || []);

  useEffect(() => {
    if (initialAbout) {
      setAbout(initialAbout);
    }
  }, [initialAbout]);

  useEffect(() => {
    setSeccionesData(initialSeccionesData || []);
  }, [initialSeccionesData]);

  // Maneja cambios de texto en `about`
  const handleAboutTextChange = (value: string) => {
    setAbout((prevAbout) => ({ ...prevAbout, descripcion: value }));
  };

  // Maneja cambios de texto y actualiza el estado de `seccionesData`
  const handleSeccionTextChange = (index: number, field: string, value: string) => {
    setSeccionesData((prevSecciones) => {
      const updatedSecciones = [...prevSecciones];
      updatedSecciones[index] = { ...updatedSecciones[index], [field]: value };
      return updatedSecciones;
    });
  };

  const handleSubmit = async (type: string) => {
    try {
      if (type === "quienesSomos" && about) {
        await editAbout(about);
        setToastMessage("¡Quienes Somos actualizados correctamente!");
      } else if (type.startsWith("seccion")) {
        const index = parseInt(type.split("_")[1], 10) - 1;
        const seccion = seccionesData[index];
        if (seccion) {
          await editSeccion(seccion);
          setToastMessage(`¡${seccion.descripcion} actualizada correctamente!`);
        }
      }
    } catch (error) {
      setToastMessage("Error al actualizar, por favor intenta nuevamente.");
    }
  };

  return (
    <ToastProvider>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Editar Quienes Somos</h2>

        {loadingAbout || loadingSecciones ? (
          <div>Cargando...</div>
        ) : (
          <Tabs>
            <TabsList>
              <TabsTrigger value="quienesSomos">Quienes Somos</TabsTrigger>
              <TabsTrigger value="seccion1">Sección 1</TabsTrigger>
              <TabsTrigger value="seccion2">Sección 2</TabsTrigger>
            </TabsList>

            <TabsContent value="quienesSomos">
              {about && (
                <EditAboutTab
                  aboutData={about}
                  handleTextChange={handleAboutTextChange}
                  handleSubmit={() => handleSubmit("quienesSomos")}
                />
              )}
            </TabsContent>

            <TabsContent value="seccion1">
              {seccionesData.length > 0 && (
                <EditSecciones
                  sectionName="Sección 1"
                  sectionData={seccionesData[0]}
                  handleTextChange={(field, texto) => handleSeccionTextChange(0, field, texto)}
                  handleSubmit={() => handleSubmit("seccion_1")}
                />
              )}
            </TabsContent>

            <TabsContent value="seccion2">
              {seccionesData.length > 1 && (
                <EditSecciones
                  sectionName="Sección 2"
                  sectionData={seccionesData[1]}
                  handleTextChange={(field, texto) => handleSeccionTextChange(1, field, texto)}
                  handleSubmit={() => handleSubmit("seccion_2")}
                />
              )}
            </TabsContent>
          </Tabs>
        )}

        {toastMessage && (
          <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded shadow-lg">
            {toastMessage}
          </div>
        )}
      </div>
    </ToastProvider>
  );
};

export default EditAbout;