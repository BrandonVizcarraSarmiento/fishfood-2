"use client";

import { motion } from "framer-motion";
import { useGetSecciones } from "@/api/secciones/getSecciones";
import InfoAboutSkeleton from "@/components/skeleton/infoAboutSkeleton";
import { Card, CardFooter } from "@/components/ui/card";

const Info = () => {
  const { seccionesData, loading, error } = useGetSecciones();

  if (loading) return <InfoAboutSkeleton />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center my-20 mx-10">
        {seccionesData.map((seccion, index) => (
          <motion.div
            key={seccion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex flex-col items-center text-center space-y-2"
          >
            <Card className="hover:border-primary transition-colors duration-300 bg-slate-200 dark:bg-slate-950">
              {/* El contenedor ahora no tiene clases para el ancho */}
              <div>
                <motion.img
                  src={seccion.imgLink}
                  alt={`imagen de ${index === 0 ? "misión" : "visión"}`}
                  className="w-full h-80 mx-auto  rounded-lg  "
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <CardFooter>
                <motion.p
                  className="text-base p-4 md:p-8 text-justify"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {seccion.descripcion}
                </motion.p>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Info;