import { Receta } from "@/types/receta";

export async function editReceta(receta: Receta, updatedReceta: Receta): Promise<Receta> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/recetas/${receta.id}`;

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedReceta),
        });

        if (!response.ok) {
            throw new Error("Error al editar la receta.");
        }

        return await response.json();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}
