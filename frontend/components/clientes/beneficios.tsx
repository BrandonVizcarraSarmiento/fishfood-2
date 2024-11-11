"use client";

import { useGetBeneficios } from "@/api/beneficios/getBeneficios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Beneficios = () => {
  const { beneficios, loading, error } = useGetBeneficios();

  if (loading) return <p>Cargando beneficios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center my-20 p-4">
      <h2 className="text-center font-bold text-3xl">Beneficios</h2>
      <div className="w-full max-w-6xl">
        <Accordion type="single" collapsible>
          {beneficios.map((beneficio, index) => (
            <AccordionItem key={beneficio.id} value={`item-${index}`}>
              <AccordionTrigger>{beneficio.pregunta}</AccordionTrigger>
              <AccordionContent className="text-left">
                {beneficio.respuesta}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Beneficios;