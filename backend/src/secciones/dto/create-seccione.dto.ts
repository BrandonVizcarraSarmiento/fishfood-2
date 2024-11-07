import { Secciones } from "@prisma/client";

export type CreateSeccioneDto = Omit<Secciones, 'id'>
