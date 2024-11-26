export async function deleteTestimonio(id: number): Promise<boolean> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/testimonios/${id}`;

    try {
        const response = await fetch(url, {
            method: "DELETE",
        });

        if (!response.ok) {
            console.error("Error al eliminar el testimonio.");
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error de conexión: ", error);
        return false;
    }
}
