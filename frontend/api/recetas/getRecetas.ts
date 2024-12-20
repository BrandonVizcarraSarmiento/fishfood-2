import { useState, useEffect, useCallback } from "react";
import { Receta } from "@/types/receta";

export function useGetRecetas() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/recetas`;
    const [recetas, setRecetas] = useState<Receta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    const fetchRecetas = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error al obtener las recetas");
            }
            const data: Receta[] = await response.json();
            setRecetas(data);
            setError("");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Error desconocido");
            }
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchRecetas();
    }, [fetchRecetas]);

    return { recetas, loading, error, refetch: fetchRecetas };
}
