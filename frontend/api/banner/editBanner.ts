import { Banner } from "@/types/banner";

export async function editBanner(banner: Banner, updatedBanner: Banner) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/banner/${banner.id}`;

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBanner),
        });

        if (!response.ok) {
            throw new Error("Error al editar el banner.");
        }

        return await response.json();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}
