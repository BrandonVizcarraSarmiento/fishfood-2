import { Receta } from "@/types/receta";

export async function addReceta(receta: Partial<Receta>): Promise<Receta | null> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/recetas`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(receta),
      });
  
      if (!response.ok) {
        console.error("Error al agregar la receta.");
        return null;
      }
  
      // Devuelve la receta creada con el ID asignado por el backend
      return await response.json();
    } catch (error) {
      console.error("Error de conexión: ", error);
      return null;
    }
  }
  