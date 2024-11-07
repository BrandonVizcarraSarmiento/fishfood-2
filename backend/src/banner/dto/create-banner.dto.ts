import { Banner } from "@prisma/client";

export type CreateBannerDto = Omit<Banner, 'id'>
