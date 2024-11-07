"use client";

import { useGetRedes } from "@/api/redes/getRedes";
import Link from "next/link";

const Redes = () => {
    const { redes, loading, error } = useGetRedes();

    if (loading) return null; // Muestra un indicador de carga si deseas
    if (error) {
        console.error("Error al cargar las redes sociales:", error);
        return null;
    }

    return (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-5 p-2 rounded-lg shadow-lg z-10">
            <Link href={redes.find(r => r.id === 1)?.linkRedes || "#"} target="_blank" rel="noopener noreferrer">
                <img src="/img/whatsapp.svg" width={30} height={30} alt="Imagen de WhatsApp" />
            </Link>
            <Link href={redes.find(r => r.id === 2)?.linkRedes || "#"} target="_blank" rel="noopener noreferrer">
                <img src="/img/instagram.svg" width={30} height={30} alt="Imagen de Instagram" />
            </Link>
            <Link href={redes.find(r => r.id === 3)?.linkRedes || "#"} target="_blank" rel="noopener noreferrer">
                <img src="/img/facebook.svg" width={30} height={30} alt="Imagen de Facebook" />
            </Link>
        </div>
    );
};

export default Redes;