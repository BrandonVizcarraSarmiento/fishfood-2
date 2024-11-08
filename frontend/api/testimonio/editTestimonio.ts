import { Testimonio } from "@/types/testimonios";

export async function editTestimonio(testimonioId: number, updatedTestimonio: Testimonio) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/testimonios/${testimonioId}`;

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTestimonio),
        });

        if (!response.ok) {
            throw new Error(`Error al editar el testimonio: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}