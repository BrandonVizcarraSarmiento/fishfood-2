import { Beneficios } from "@prisma/client";

export type CreateBeneficioDto = Omit<Beneficios, 'id'>
