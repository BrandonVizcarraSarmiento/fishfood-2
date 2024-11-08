import { Mision } from "@/types/mision";

export async function editMision(mision: Mision) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/mision/${mision.id}`;

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mision),
        });

        if (!response.ok) {
            throw new Error(`Error al editar la misión: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}
