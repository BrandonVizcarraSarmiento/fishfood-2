import { Testimonios } from "@prisma/client";

export type CreateTestimonioDto = Omit<Testimonios, 'id'>
