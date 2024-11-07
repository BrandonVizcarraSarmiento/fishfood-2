import { Mision } from "@prisma/client";

export type CreateMisionDto = Omit<Mision, 'id'>
