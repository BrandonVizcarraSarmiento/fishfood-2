import { Button } from "@/components/ui/button";
import { About } from "@/types/about";


type EditAboutTabProps = {
  aboutData: About;
  handleTextChange: (value: string) => void;
  handleSubmit: () => void;
};

const EditAboutTab = ({ aboutData, handleTextChange, handleSubmit }: EditAboutTabProps) => {
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
          <label className="block font-semibold mb-2">Texto de Quienes Somos</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded resize-none"
            rows={4}
            value={aboutData.descripcion}
            onChange={(e) => handleTextChange(e.target.value)}
          />
        </div>
        <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Guardar Cambios
        </Button>
      </form>
    </div>
  );
};

export default EditAboutTab;