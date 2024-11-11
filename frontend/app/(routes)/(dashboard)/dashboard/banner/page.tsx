"use client";

import { useState, useEffect } from "react";
import { ToastProvider } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Banner } from "@/types/banner";
import { useGetBanner } from "@/api/banner/getBanner";
import { editBanner } from "@/api/banner/editBanner";

const EditBanner = () => {
  const { banner, loading, error } = useGetBanner();
  const [imageLink, setImageLink] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (banner) {
      setImageLink(banner.imgLink);
    }
  }, [banner]);

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageLink(e.target.value);
  };

  const handleSaveChanges = async () => {
    if (imageLink && banner) {
      try {
        const updatedBanner: Banner = { ...banner, imgLink: imageLink };
        await editBanner(banner, updatedBanner);
        setToastMessage("Enlace de la imagen actualizado con éxito");
      } catch (error) {
        console.error("Error al actualizar el enlace de la imagen:", error);
        setToastMessage("Error al actualizar el enlace de la imagen");
      }
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ToastProvider>
      <div className="flex flex-col items-center justify-center h-full p-6 bg-white rounded-lg shadow-md dark:bg-slate-800">
        <h1 className="text-3xl font-bold mb-6 dark:text-blue-500">Edita el Banner</h1>
        
        <label className="mb-2 w-full text-center">
          <span className="block text-lg font-semibold mb-2 dark:text-blue-500">
            Enlace de la imagen del banner
          </span>
          <input
            type="text"
            value={imageLink}
            onChange={handleLinkChange}
            placeholder="Ingresa el enlace de la imagen"
            className="p-2 border border-gray-600 rounded w-1/2 max-w-2xl mx-auto"
            required
          />
        </label>

        {imageLink && (
          <div className="mt-4">
            <h2 className="text-xl text-center font-semibold mb-2 dark:text-blue-500">Vista previa de la imagen</h2>
            <img
              src={imageLink}
              alt="Vista previa del banner"
              className="w-96 h-auto mb-6 rounded-lg shadow-md"
            />
          </div>
        )}

        <Button
          onClick={handleSaveChanges}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-300"
        >
          Guardar Cambios
        </Button>
      </div>

      {showToast && toastMessage && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded shadow-lg">
          {toastMessage}
        </div>
      )}
    </ToastProvider>
  );
};

export default EditBanner;