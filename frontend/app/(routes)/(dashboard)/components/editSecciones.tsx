import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Seccion } from "@/types/secciones";

type EditSeccionesProps = {
  sectionName: string;
  sectionData: Seccion;
  handleTextChange: (field: string, value: string) => void;
  handleSubmit: () => void;
};

const EditSecciones = ({
  sectionName,
  sectionData,
  handleTextChange,
  handleSubmit,
}: EditSeccionesProps) => {
  const [descripcion, setDescripcion] = useState(sectionData.descripcion);
  const [imgLink, setImgLink] = useState(sectionData.imgLink);

  useEffect(() => {
    setDescripcion(sectionData.descripcion);
    setImgLink(sectionData.imgLink);
  }, [sectionData]);

  return (
    <div className="p-4 rounded-md shadow-md dark:bg-slate-800">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label className="block font-semibold mb-2">Texto de {sectionName}</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded resize-none"
            rows={4}
            value={descripcion}
            onChange={(e) => {
              setDescripcion(e.target.value);
              handleTextChange("descripcion", e.target.value);
            }}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Link de Imagen de {sectionName}</label>
          <input
            type="text"
            value={imgLink}
            onChange={(e) => {
              setImgLink(e.target.value);
              handleTextChange("imglink", e.target.value);
            }}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="URL de la imagen"
          />
        </div>

        {imgLink && (
          <div className="mt-4">
            <label className="block font-semibold mb-2">Vista Previa de la Imagen</label>
            <img
              src={imgLink}
              alt={`Vista previa de ${sectionName}`}
              className="w-64 h-64 object-cover mt-2 rounded-md border border-gray-500"
            />
          </div>
        )}

        <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Guardar Cambios
        </Button>
      </form>
    </div>
  );
};

export default EditSecciones;
