import { Button } from "@/components/ui/button";

type EditSectionProps = {
  sectionName: string;
  sectionData: { texto: string; imagen: string; id: number };
  handleTextChange: (value: string) => void;
  handleImageLinkChange: (value: string) => void;
  handleSubmit: () => void;
};

const EditSection = ({
  sectionName,
  sectionData,
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
          <label className="block font-semibold mb-2">Texto de {sectionName}</label>
          <textarea
            className="w-full p-2 border border-gray-600 rounded resize-none"
            rows={4}
            value={sectionData.texto}
            onChange={(e) => handleTextChange(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Link de Imagen de {sectionName}</label>
          <input
            type="text"
            value={sectionData.imagen}
            onChange={(e) => handleImageLinkChange(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded"
            placeholder="URL de la imagen"
            required
          />
        </div>

        {/* Previsualización de la imagen si existe */}
        {sectionData.imagen && (
          <div className="mt-4">
            <label className="block font-semibold mb-2">Vista Previa de la Imagen</label>
            <img
              src={sectionData.imagen}
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

export default EditSection;
