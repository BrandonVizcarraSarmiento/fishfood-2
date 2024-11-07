import { useState, useEffect } from "react";
import { Redes } from "@/types/redes";

export function useGetRedes() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/redes`;
    const [redes, setRedes] = useState<Redes[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchRedes = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error al obtener las redes");
                }
                const data: Redes[] = await response.json();
                setRedes(data);
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

        fetchRedes();
    }, [url]);

    return { redes, loading, error };
}
