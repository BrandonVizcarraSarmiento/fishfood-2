import { Receta } from "@/types/receta";

export async function addReceta(receta: Receta): Promise<boolean> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/recetas`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(receta),
        });

        if (!response.ok) {
            console.error("Error al agregar la receta.");
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error de conexión: ", error);
        return false;
    }
}
