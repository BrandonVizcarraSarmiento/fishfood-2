import { useState, useEffect } from "react";
import { About } from "@/types/about";

export function useGetAbout() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/about`;
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error al obtener los datos de 'About'");
        }
        const data: About = await response.json();
        setAbout(data);
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

    fetchAbout();
  }, [url]);

  return { about, loading, error };
}
