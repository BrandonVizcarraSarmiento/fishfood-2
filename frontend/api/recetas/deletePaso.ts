export async function deletePaso(recetaId: number, pasoId: number): Promise<boolean> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/recetas/${recetaId}/pasos/${pasoId}`;

    try {
        const response = await fetch(url, {
            method: "DELETE",
        });

        if (!response.ok) {
            console.error("Error al eliminar el paso.");
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error de conexión: ", error);
        return false;
    }
}
