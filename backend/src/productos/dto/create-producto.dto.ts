import { Productos } from "@prisma/client";

export type CreateProductoDto = Omit<Productos, 'id' | 'createdAt' | 'updatedAt'>