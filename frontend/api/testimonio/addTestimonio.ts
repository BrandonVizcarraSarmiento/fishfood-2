import { Testimonio } from "@/types/testimonios";

export async function addTestimonio(testimonio: Testimonio): Promise<boolean> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/testimonios`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testimonio),
        });

        if (!response.ok) {
            console.error("Error al agregar el testimonio.");
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error de conexión: ", error);
        return false;
    }
}
