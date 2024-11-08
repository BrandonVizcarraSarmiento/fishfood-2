import { useState, useEffect } from "react";
import { Testimonio } from "@/types/testimonios";

export function useGetTestimonios() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/testimonios`;
    const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTestimonios = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error al obtener los testimonios");
                }
                const data: Testimonio[] = await response.json();
                setTestimonios(data);
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

        fetchTestimonios();
    }, [url]);

    return { testimonios, loading, error };
}
