"use client";

import { useInView } from "react-intersection-observer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useGetTestimonios } from "@/api/testimonio/getTestimonio";
import TestimoniosSkeleton from "../skeleton/testimoniosSkeleton";

const Testimonios = () => {
  const { testimonios, loading, error } = useGetTestimonios();
  const { ref, inView } = useInView({
    triggerOnce: true, // Solo dispara la animación la primera vez que el elemento entra en vista
    threshold: 0.5, // Puedes ajustar el umbral según lo que necesites
  });

  if (loading) return <TestimoniosSkeleton />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <section className="flex flex-col items-center my-10 p-4">
      <h2 className="text-center text-2xl font-bold mb-6 md:text-3xl">Testimonios</h2>
      <div className="w-full max-w-4xl">
        {testimonios.map((testimonio) => (
          <div
            key={testimonio.id}
            ref={ref}
            className={`transition-all duration-1000 ease-out ${inView ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"}`}
          >
            <Alert className="flex flex-col items-start bg-slate-200 p-4 rounded-lg mb-4 dark:text-white dark:bg-transparent dark:hover:bg-slate-950 md:flex-row">
              {/* Avatar responsivo */}
              <Avatar className="mb-4 md:mb-0 md:mr-4">
                <AvatarImage src={testimonio.imgLink} alt={testimonio.nombre} />
                <AvatarFallback>{testimonio.nombre.charAt(0)}</AvatarFallback>
              </Avatar>
              {/* Contenido del testimonio */}
              <div className="w-full">
                <AlertTitle className="font-bold text-lg mb-2">{testimonio.nombre}</AlertTitle>
                <AlertDescription className="text-sm sm:text-base">
                  {testimonio.testimonio}
                </AlertDescription>
              </div>
            </Alert>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonios;