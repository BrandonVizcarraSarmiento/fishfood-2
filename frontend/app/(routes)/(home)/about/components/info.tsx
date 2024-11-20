"use client";

import { useGetSecciones } from "@/api/secciones/getSecciones";
import InfoAboutSkeleton from "@/components/skeleton/infoAboutSkeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const Info = () => {
  const { seccionesData, loading, error } = useGetSecciones();

  if (loading) return <InfoAboutSkeleton />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center my-20 mx-10">
        {seccionesData.map((seccion, index) => (
          <Card
            key={seccion.id}
            className="flex flex-col items-center text-center space-y-2 hover:border-primary transition-colors duration-300 bg-slate-200 dark:bg-slate-950"
          >
            <CardContent>
              <img
                src={seccion.imgLink}
                width={300}
                height={300}
                alt={`imagen de ${index === 0 ? "misión" : "visión"}`}
                className="h-64 w-64 mx-auto"
              />
            </CardContent>
            <CardFooter>
              <p className="text-base md:px-8 text-justify">{seccion.descripcion}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Info;