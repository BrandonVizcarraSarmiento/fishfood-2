import { About } from "@prisma/client";

export type CreateAboutDto = Omit<About, 'id'>
