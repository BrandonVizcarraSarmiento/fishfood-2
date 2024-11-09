import { useState, useEffect } from "react";
import { secciones } from "@/types/secciones";

export function useGetSecciones() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/secciones`;
  const [seccionesData, setSeccionesData] = useState<secciones[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSecciones = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error al obtener las secciones");
        }
        const data: secciones[] = await response.json();
        setSeccionesData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSecciones();
  }, [url]);

  return { seccionesData, loading, error };
}
