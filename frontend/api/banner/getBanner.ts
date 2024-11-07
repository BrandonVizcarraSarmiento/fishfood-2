import { useState, useEffect } from "react";
import { Banner } from "@/types/banner";

export function useGetBanner() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/banner/1`;
    const [banner, setBanner] = useState<Banner | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error al obtener el banner");
                }
                const data: Banner = await response.json();
                setBanner(data);
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

        fetchBanner();
    }, [url]);

    return { banner, loading, error };
}