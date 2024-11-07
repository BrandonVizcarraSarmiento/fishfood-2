import { Redes } from "@/types/redes";

export async function editRedes(redes: Redes, updatedRedes: Redes) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/redes/${redes.id}`;

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedRedes),
        });

        if (!response.ok) {
            throw new Error("Error al editar redes.");
        }

        return await response.json();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}
