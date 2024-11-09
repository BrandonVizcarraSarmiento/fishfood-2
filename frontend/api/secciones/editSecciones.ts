import { secciones } from "@/types/secciones";

export async function editSeccion(updatedSeccion: secciones) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/secciones/${updatedSeccion.id}`;

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedSeccion),
        });

        if (!response.ok) {
            throw new Error(`Error al editar la sección: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}
