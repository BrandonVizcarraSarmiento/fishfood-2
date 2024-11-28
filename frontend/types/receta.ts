export interface Paso {
    id?: number;
    numero: number;
    descripcion: string;
}

export interface Receta {
    id?: number;
    titulo: string;
    ingredientes: string;
    imagen: string;
    pasos: Paso[];
    createdAt?: string;
    updatedAt?: string;
}
