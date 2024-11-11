import { Button } from "@/components/ui/button";
import { Testimonio } from "@/types/testimonios";

type EditSectionProps = {
  sectionName: string;
  sectionData: Testimonio;
  previewImage: string;
  handleTextChange: (field: keyof Testimonio, value: string) => void;
  handleImageLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
};

const EditSectionTestimonio = ({
  sectionName,
  sectionData,
  previewImage,
  handleTextChange,
  handleImageLinkChange,
  handleSubmit,
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
        <div>
          <label className="block font-semibold mb-2">Nombre</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-600 rounded"
            value={sectionData.nombre}
            onChange={(e) => handleTextChange("nombre", e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Testimonio</label>
          <textarea
            className="w-full p-2 border border-gray-600 rounded resize-none"
            rows={4}
            value={sectionData.testimonio}
            onChange={(e) => handleTextChange("testimonio", e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Avatar (URL de imagen)</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-600  rounded"
            value={sectionData.imgLink}
            onChange={handleImageLinkChange}
            placeholder="Ingresa la URL de la imagen"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt={sectionName}
              className="w-64 h-64 object-cover mt-2 rounded-md border border-gray-600 "
            />
          )}
        </div>
        <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Guardar Cambios
        </Button>
      </form>
    </div>
  );
};

export default EditSectionTestimonio;