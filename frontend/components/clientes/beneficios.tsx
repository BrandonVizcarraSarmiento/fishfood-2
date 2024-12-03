"use client";
 
import { useInView } from "react-intersection-observer";
import { useGetBeneficios } from "@/api/beneficios/getBeneficios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BeneficiosSkeleton from "../skeleton/beneficiosSkeleton";
 
const Beneficios = () => {
  const { beneficios, loading, error } = useGetBeneficios();
  const { ref, inView } = useInView({
    triggerOnce: true, // Solo dispara la animación la primera vez que el elemento entra en vista
    threshold: 0.5, // Puedes ajustar el umbral según lo que necesites
  });
 
  if (loading) {
    return <BeneficiosSkeleton />;
  }
 
  if (error) return <p>Error: {error}</p>;
 
  return (
    <div className="flex flex-col items-center my-20 p-4">
      <h2 className="text-center font-bold text-3xl">Beneficios</h2>
      <div className="w-full max-w-6xl">
        <Accordion type="single" collapsible>
          <div ref={ref} className={`transition-all duration-1000 ease-out ${inView ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"}`}>
            {beneficios.map((beneficio, index) => (
              <AccordionItem key={beneficio.id} value={`item-${index}`}>
                <AccordionTrigger>{beneficio.pregunta}</AccordionTrigger>
                <AccordionContent className="text-left">
                  {beneficio.respuesta}
                </AccordionContent>
              </AccordionItem>
            ))}
          </div>
        </Accordion>
      </div>
    </div>
  );
};
 
export default Beneficios;