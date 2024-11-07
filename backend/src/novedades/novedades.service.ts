import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNovedadeDto } from './dto/create-novedade.dto';
import { UpdateNovedadeDto } from './dto/update-novedade.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NovedadesService {

  constructor(private prismaService: PrismaService) { }

  create(createNovedadeDto: CreateNovedadeDto) {
    return this.prismaService.novedades.create({ data: createNovedadeDto })
  }

  findAll() {
    return this.prismaService.novedades.findMany();
  }

  async findOne(id: number) {
    const novedadEncontrado = await this.prismaService.novedades.findUnique({ where: { id: id } });

    if (!novedadEncontrado) {
      throw new NotFoundException(`Novedad ${id} no encontrado`);
    }

    return novedadEncontrado;
  }

  async update(id: number, updateNovedadeDto: UpdateNovedadeDto) {
    const novedadActulizada = await this.prismaService.novedades.update({ where: { id }, data: updateNovedadeDto });

    if (!novedadActulizada) {
      throw new NotFoundException(`Novedad ${id} no encontrado`);
    }

    return novedadActulizada;
  }

  async remove(id: number) {
    const novedadEliminada = await this.prismaService.novedades.delete({ where: { id } });

    if (!novedadEliminada) {
      throw new NotFoundException(`Novedad ${id} no encontrado`);
    }

    return novedadEliminada;
  }
}
