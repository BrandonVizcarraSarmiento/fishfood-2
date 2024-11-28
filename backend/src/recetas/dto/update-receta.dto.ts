import { CreatePasoDto } from './create-receta.dto';

export interface UpdatePasoDto extends Partial<CreatePasoDto> {
  id?: number; // Para identificar el paso si es una actualización
}

export interface UpdateRecetaDto {
  titulo?: string;
  imagen?: string;
  ingredientes?: string;
  pasos?: UpdatePasoDto[]; // Lista de pasos para actualizar o agregar
}