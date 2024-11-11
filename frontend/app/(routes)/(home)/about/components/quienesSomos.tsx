"use client";

import { useGetAbout } from "@/api/about/getAbout";

const QuienesSomos = () => {
  const { about, loading, error } = useGetAbout();

  if (loading) return <p>Cargando información...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-20 lg:px-40 py-10 md:py-16 text-center my-20">
      <p className="text-4xl font-sans font-extrabold mb-4">¿Quiénes somos?</p>
      <p className="text-base w-full max-w-2xl">{about?.descripcion}</p>
    </div>
  );
};

export default QuienesSomos;