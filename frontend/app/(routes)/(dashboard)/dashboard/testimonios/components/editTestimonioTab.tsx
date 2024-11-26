import { Button } from "@/components/ui/button";
import { Testimonio } from "@/types/testimonios";
import EliminarTestimonio from "./eliminarTestimonio";

type EditSectionProps = {
  sectionName: string;
  sectionData: Testimonio;
  previewImage: string;
  handleTextChange: (field: keyof Testimonio, value: string) => void;
  handleImageLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleDelete: (id: number) => void;
};

const EditSectionTestimonio = ({
  sectionName,
  sectionData,
  previewImage,
  handleTextChange,
  handleImageLinkChange,
  handleSubmit,
  handleDelete,
}: EditSectionProps) => {
  return (
    <div className="p-4 rounded-md shadow-md dark:bg-slate-800">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna 1: Nombre y Testimonio */}
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Nombre</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-600 rounded"
                value={sectionData.nombre}
                onChange={(e) => handleTextChange("nombre", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Testimonio</label>
              <textarea
                className="w-full p-2 border border-gray-600 rounded resize-none"
                rows={4}
                value={sectionData.testimonio}
                onChange={(e) => handleTextChange("testimonio", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Columna 2: Avatar y URL de imagen */}
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Avatar (URL de imagen)</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-600 rounded"
                value={sectionData.imgLink}
                onChange={handleImageLinkChange}
                placeholder="Ingresa la URL de la imagen"
                required
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt={sectionName}
                  className="w-64 h-64 object-cover mt-2 rounded-full border border-gray-600 mx-auto"
                />
              )}
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
          <Button type="submit" className="py-2 px-4 rounded w-full sm:w-auto">
            Guardar Cambios
          </Button>
          <EliminarTestimonio id={sectionData.id!} onDelete={handleDelete} />
        </div>
      </form>
    </div>
  );
};

export default EditSectionTestimonio;