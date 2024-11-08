import { Beneficios } from "@/types/beneficios";

export async function editBeneficio(beneficioId: number, updatedBeneficio: Beneficios) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/beneficios/${beneficioId}`;

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBeneficio),
        });

        if (!response.ok) {
            throw new Error(`Error al editar el beneficio: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}