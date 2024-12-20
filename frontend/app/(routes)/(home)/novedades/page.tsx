"use client";
import Navbar from "@/components/clientes/navbar";
import EventoPrincipal from "./components/eventoPrincipal";
import OtrosEventos from "./components/otrosEventos";
import Redes from "@/components/clientes/redes";
import Footer from "@/components/clientes/footer";
import { useGetNovedades } from "@/api/novedades/useGetNovedades";
import NovedadesSkeleton from "@/components/skeleton/novedadesSkeleton";

const Novedades = () => {
  const { novedades, loading, error } = useGetNovedades();

  if (loading) {
    return <NovedadesSkeleton />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Navbar />
      <Redes />
      {novedades.length > 0 && <EventoPrincipal evento={novedades[0]} />} {/* Evento más reciente */}
      <OtrosEventos eventos={novedades.slice(1)} /> {/* Otros eventos */}
      <Footer />
    </>
  );
};

export default Novedades;