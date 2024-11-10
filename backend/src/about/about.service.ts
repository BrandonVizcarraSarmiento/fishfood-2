import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AboutService {

  constructor(private prismaService: PrismaService) { }

  create(createAboutDto: CreateAboutDto) {
    return this.prismaService.about.create({ data: createAboutDto })
  }

  findAll() {
    return this.prismaService.about.findMany();
  }

  async findOne(id: number) {
    const aboutEncontrado = await this.prismaService.about.findUnique({ where: { id: id } });

    if (!aboutEncontrado) {
      throw new NotFoundException(`About ${id} no encontrado`);
    }

    return aboutEncontrado;
  }

  async update(id: number, updateAboutDto: UpdateAboutDto) {
    const aboutActulizado = await this.prismaService.about.update({ where: { id }, data: updateAboutDto });

    if (!aboutActulizado) {
      throw new NotFoundException(`About ${id} no encontrado`);
    }

    return aboutActulizado;
  }

  remove(id: number) {
    return `This action removes a #${id} about`;
  }
}
