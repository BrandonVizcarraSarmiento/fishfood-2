"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useGetTestimonios } from "@/api/testimonio/getTestimonio";

const Testimonios = () => {
  const { testimonios, loading, error } = useGetTestimonios();

  if (loading) return <p>Cargando testimonios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="flex flex-col items-center my-20 p-4">
      <h2 className="text-center text-3xl font-bold mb-6">Testimonios</h2>
      <div className="w-full max-w-6xl">
        {testimonios.map((testimonio) => (
          <div key={testimonio.id}>
            <Alert className="flex items-start bg-slate-200 p-4 rounded-lg mb-4 dark:text-white dark:bg-transparent dark:hover:bg-slate-950">
              <Avatar className="mr-4">
                <AvatarImage src={testimonio.imgLink} alt={testimonio.nombre} />
                <AvatarFallback>{testimonio.nombre.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <AlertTitle className="font-bold">{testimonio.nombre}</AlertTitle>
                <AlertDescription>{testimonio.testimonio}</AlertDescription>
              </div>
            </Alert>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonios;