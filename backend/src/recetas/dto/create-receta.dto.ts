export interface CreatePasoDto {
    numero: number;
    descripcion: string;
}

export interface CreateRecetaDto {
    titulo: string;
    imagen: string;
    ingredientes: string;
    pasos: CreatePasoDto[];
}
