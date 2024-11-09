import { About } from "@/types/about";

export async function editAbout(updatedAbout: About) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/about/${updatedAbout.id}`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAbout),
    });

    if (!response.ok) {
      throw new Error(`Error al editar los datos de 'About': ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Error desconocido");
  }
}
