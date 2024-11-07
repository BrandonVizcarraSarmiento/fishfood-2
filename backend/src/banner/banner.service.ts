import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BannerService {

  constructor(private prismaService: PrismaService) { }

  create(createBannerDto: CreateBannerDto) {
    return this.prismaService.banner.create({ data: createBannerDto })
  }

  findAll() {
    return this.prismaService.banner.findMany();
  }

  async findOne(id: number) {
    const bannerEncontrado = await this.prismaService.banner.findUnique({ where: { id: id } });

    if (!bannerEncontrado) {
      throw new NotFoundException(`Banner ${id} no encontrado`);
    }

    return bannerEncontrado;
  }

  async update(id: number, updateBannerDto: UpdateBannerDto) {
    const bannerActulizada = await this.prismaService.banner.update({ where: { id }, data: updateBannerDto });

    if (!bannerActulizada) {
      throw new NotFoundException(`Banner ${id} no encontrado`);
    }

    return bannerActulizada;
  }

  remove(id: number) {
    return `This action removes a #${id} banner`;
  }
}
