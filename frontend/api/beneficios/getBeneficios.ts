import { useState, useEffect } from "react";
import { Beneficios } from "@/types/beneficios";

export function useGetBeneficios() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/beneficios`;
    const [beneficios, setBeneficios] = useState<Beneficios[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBeneficios = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error al obtener los beneficios");
                }
                const data: Beneficios[] = await response.json();
                setBeneficios(data);
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

        fetchBeneficios();
    }, [url]);

    return { beneficios, loading, error };
}