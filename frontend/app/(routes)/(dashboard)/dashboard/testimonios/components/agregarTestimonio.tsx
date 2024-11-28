import { useState } from "react";
import { Input } from "@/components/ui/input";  
import { Button } from "@/components/ui/button"; 
import { Testimonio } from "@/types/testimonios";

interface AgregarTestimonioProps {
  onSubmit: (testimonio: Testimonio) => void;
}

const AgregarTestimonio = ({ onSubmit }: AgregarTestimonioProps) => {
  const [nombre, setNombre] = useState("");
  const [testimonio, setTestimonio] = useState("");
  const [imgLink, setImgLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTestimonio: Testimonio = {
      nombre,
      testimonio,
      imgLink,
    };
    onSubmit(newTestimonio);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
        required
      />
      <Input
        name="testimonio"
        value={testimonio}
        onChange={(e) => setTestimonio(e.target.value)}
        placeholder="Testimonio"
        required
      />
      <Input
        name="imgLink"
        value={imgLink}
        onChange={(e) => setImgLink(e.target.value)}
        placeholder="URL de la imagen"
        required
      />
      <Button type="submit">Agregar Testimonio</Button>
    </form>
  );
};

export default AgregarTestimonio;