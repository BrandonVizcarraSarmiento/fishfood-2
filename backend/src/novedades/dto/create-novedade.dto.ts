import { Novedades } from "@prisma/client"

export type CreateNovedadeDto = Omit< Novedades, 'id' | 'createdAt' | 'updatedAt'>

