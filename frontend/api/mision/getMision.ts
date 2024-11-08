import { useState, useEffect } from "react";
import { Mision } from "@/types/mision";

export function useGetMision() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/mision`; // Cambié la URL para que obtengas todas las misiones
  const [misiones, setMisiones] = useState<Mision[]>([]); // Ahora es un array de misiones
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchMisiones = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error al obtener las misiones");
        }
        const data: Mision[] = await response.json(); // Obtén un array de misiones
        setMisiones(data);
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

    fetchMisiones();
  }, [url]);

  return { misiones, loading, error };
}
