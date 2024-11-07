import { Redes } from "@prisma/client";

export type CreateRedeDto = Omit<Redes, 'id'>
